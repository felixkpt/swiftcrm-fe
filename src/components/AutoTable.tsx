import useAutoTableEffect from '@/hooks/useAutoTableEffect';
import { debounce } from 'lodash';
import Pagination from './Pagination';
import { AutoTableInterface, ResponseData } from '@/interfaces';
import { useEffect, useRef, useState } from 'react';
import { convertToTitleCase, emitPrepareEdit } from '@/utils/helpers';
import { Icon } from '@iconify/react';

// Define the __dangerousHtml function
function __dangerousHtml(html) {
    // Implement the logic to safely render HTML content here
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
}


const AutoTable = ({ baseUri, listUri, search, columns: initCols, setData }: AutoTableInterface) => {
    const {
        tableData,
        loading,
        handleOrderBy,
        handleSearch,
        setPage,
        setPerPage,
        setReload,
    } = useAutoTableEffect(baseUri, listUri);

    const [checkedItems, setCheckedItems] = useState<(string | number)[]>([]);
    const [checkedAllItems, setCheckedAllItems] = useState<boolean>(false);
    const [modelDataLength, setModelDataLength] = useState<number>(-1);

    const autoTableRef = useRef()

    useEffect(() => {
        if (tableData?.data?.length >= 0) {
            setModelDataLength(tableData.data.length);
            setData(tableData)
        } else setModelDataLength(-1);
    }, [tableData]);

    const debouncedSearch = debounce(handleSearch, 400);

    const handleChecked = (checked: boolean, itemId: string | null) => {
        if (modelDataLength <= 0) return;

        if (itemId !== null) {
            if (checked) {
                // Add the item ID to checkedItems
                setCheckedItems((prev) => [...prev, itemId]);
            } else {
                // Remove the item ID from checkedItems
                setCheckedItems((prevCheckedItems) =>
                    prevCheckedItems.filter((id) => id !== itemId)
                );
            }
        } else {
            if (checked) {
                // Check all items
                const allIds = tableData.data.map((row) => row.id);
                setCheckedItems(allIds);
            } else {
                // Uncheck all items
                setCheckedItems([]);
            }
        }
    };

    useEffect(() => {
        if (modelDataLength <= 0) return;

        if (checkedItems?.length === tableData.data.length) setCheckedAllItems(true);
        else setCheckedAllItems(false);
    }, [checkedItems]);

    const [columns, setColumns] = useState(initCols)

    const renderTableHeaders = (columns: any) => {
        return columns.map((column: any) => {
            const { label, key, isSorted, sortDirection } = column;

            const handleHeaderClick = () => {
                const newColumns = columns.map((c: any) => ({
                    ...c,
                    isSorted: c.key === key,
                    sortDirection: c.key === key ? (c.sortDirection === 'asc' ? 'desc' : 'asc') : '',
                }));

                handleOrderBy(key);
                setColumns(newColumns);
            };

            return (
                <th key={key} scope='col' className='px-6 py-3 cursor-pointer' onClick={handleHeaderClick}>
                    {convertToTitleCase(label)}
                    {isSorted && (
                        <span className='ml-1'>
                            {sortDirection === 'asc' ? (
                                <Icon icon="fluent:caret-up-20-filled" />)
                                : (
                                    <Icon icon="fluent:caret-down-20-filled" />
                                )}
                        </span>
                    )}
                </th>
            );
        });
    };


    useEffect(() => {

        if (modelDataLength > 0 && autoTableRef?.current) {

            // Waiting for the data to be written on the DOM you can adjust the timeout
            setTimeout(() => {

                // Attach event listener to the "Edit" option
                autoTableRef?.current?.querySelectorAll('.prepare-edit').forEach((editLink) => {

                    editLink.addEventListener('click', (event) => {
                        event.preventDefault()

                        const id = event.target.getAttribute('data-id')
                        const action = event.target.getAttribute('href')

                        const Row = tableData.data.find(item => item.id == id)

                        const { model_name, model_name_plural, fillable } = tableData

                        emitPrepareEdit(Row, action, { model_name, model_name_plural, fillable })

                    });
                });

            }, 100);

        }

    }, [modelDataLength])

    return (
        <div ref={autoTableRef} className={`autotable shadow rounded-3 px-1 my-3 relative overflow-x-auto shadow-md sm:rounded-lg ${modelDataLength >= 0 ? 'overflow-hidden' : 'overflow-auto'}`}>
            <div className="bg-gray-50 dark:bg-gray-800 py-3.5 overflow-auto">
                <div className={`mt-2 h-6 px-3 pb-1 text-sm font-medium leading-none text-center text-blue-800 dark:text-white${modelDataLength >= 0 && loading ? ' animate-pulse' : ''}`}>{modelDataLength >= 0 && loading ? 'Loading...' : ''}</div>
                <div className="flex items-center justify-between pb-2 px-1.5 float-right gap-2">
                    <div className='hidden'>
                        {/* Dropdown */}
                    </div>
                    <label htmlFor="table-search" className="sr-only d-none">Search</label>
                    {
                        search &&
                        <div className="relative">

                            <div className="col-md-12 col-md-offset-3">
                                <div className="input-group">
                                    <div className="input-group-btn search-panel" data-search="students">
                                        <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                            <span className="search_by">Filter by</span> <span className="caret"></span>
                                        </button>
                                        <ul className="dropdown-menu" role="menu">
                                            <li><a data-search="students">students</a></li>
                                            <li><a data-search="teachers">teachers</a></li>
                                            <li><a data-search="rooms">rooms</a></li>
                                            <li className="divider"></li>
                                            <li><a data-search="all">all</a></li>
                                        </ul>
                                    </div>
                                    <input type="text" className="form-control" name="q" id="search-btn" onChange={(e: any) => debouncedSearch(e.target.value)} placeholder="Search here..." />
                                    <span className="input-group-btn">
                                        <button className="btn btn-default" type="button"><span className="glyphicon glyphicon-search"></span></button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    }
                </div>

                <table className="table table-hover">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="p-x cursor-default col">
                                <div className="form-check">
                                    <label className="form-check-label" htmlFor="checkbox-all-search">
                                        <input
                                            id="checkbox-all-search"
                                            className="form-check-input" type="checkbox" value=""
                                            checked={checkedAllItems}
                                            onChange={(e) => handleChecked(e.target.checked, null)} />
                                        All
                                    </label>
                                </div>

                            </th>
                            {columns && renderTableHeaders(columns)}
                        </tr>
                    </thead>
                    <tbody>
                        {modelDataLength > 0 ? tableData.data.map(row => (
                            <tr key={row.id} className={`"bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" ${loading === false ? 'opacity-100 transition-opacity duration-1000' : 'opacity-[0.9]'}`}>
                                <td className="w-4 p-4">
                                    <div className="form-check">
                                        <label className="form-check-label" htmlFor={`checkbox-table-search-${row.id}`}>
                                            <input
                                                id={`checkbox-table-search-${row.id}`}
                                                className="form-check-input" type="checkbox"
                                                onChange={(e) => handleChecked(e.target.checked, row.id)}
                                                checked={checkedItems.includes(row.id)} />
                                        </label>
                                    </div>
                                </td>

                                {columns && columns.map(column => {
                                    return (
                                        <td key={column.key} scope="col" className="px-6 py-3">{column.key === 'action' ? __dangerousHtml(row[column.key]) : row[column.key]}</td>
                                    )
                                })}

                            </tr>
                        ))
                            :
                            (
                                loading ?
                                    <tr className='opacity-100 transition-opacity duration-1000'>
                                        <td colSpan={(columns?.length || 1) + 2}>
                                            <div className='flex justify-center'>
                                                <div className="flex items-center justify-center w-full h-40 border border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                                                    <div className="px-3 py-1 text-sm font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">Loading...</div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    :
                                    <tr className='opacity-100 transition-opacity duration-1000'>
                                        <td colSpan={(columns?.length || 1) + 2}>
                                            <div className='flex justify-center'>
                                                <div className="flex items-center justify-center w-full h-40 border border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                                                    There's nothing here
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
            {
                modelDataLength >= 0 && tableData.per_page &&
                <Pagination items={tableData} setPage={setPage} setPerPage={setPerPage} />
            }
        </div>
    )
}


export default AutoTable