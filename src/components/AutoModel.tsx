import { useEffect, useRef, useState } from 'react';
import { convertToTitleCase, emitAjaxPost } from '@/utils/helpers';
import AsyncSelect from 'react-select/async';
import Str from '@/utils/Str';

interface ModalProps {
    modelName?: string;
    fillable?: { [key: string]: { input: string; type: string } };
    data: any;
    actionUrl: string;
    list_sources: any;
    list_depends_on: any;
    id?: string
    size?: 'modal-sm' | 'modal-lg' | 'modal-xl'
}

const AutoModel: React.FC<ModalProps> = ({ data, actionUrl, size, id, list_sources }) => {

    const [inputData, setInputData] = useState<{ [key: string]: string }>({});
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [hasFillable, setHasFillable] = useState(false);
    const [fillable, setFillable] = useState([]);
    const [modelName, setModelName] = useState([]);
    const [method, setMethod] = useState("POST");

    const [computedSize, setComputedSize] = useState<string>('')

    async function getOptions(key: string) {

        try {
            const fn = Str.camel(key)
            console.log(fn)
            const options = await list_sources[fn]();
            return options;
        } catch (e) { console.log(e) }

        return []

    }

    useEffect(() => {
        if (data) {
            setFillable(data?.fillable || []);
            setModelName(data?.model_name || null);
        }
    }, [data]);

    useEffect(() => {
        const transformedObject: { [key: string]: string } = {};
        const keys = Object.keys(fillable);
        keys.forEach((key: string) => {
            transformedObject[key] = '';
        });

        let length = keys.length
        if (length > 0) {
            setHasFillable(true);
            setInputData(transformedObject);

            if (size)
                setComputedSize(size)
            else if (length < 8)
                setComputedSize('modal-sm')
            else if (length < 16)
                setComputedSize('modal-lg')
            else if (length > 16)
                setComputedSize('modal-xl')
        }

        if (fillable && data?.data) {
            let row = data.data

            for (const key in row) {
                transformedObject[key] = row[key];
                setMethod('put')
            }

            setInputData(transformedObject);
        }

    }, [fillable, data]);

    const errors = {};

    const formRef = useRef<HTMLFormElement>(null);
    const firstErrorRef = useRef<HTMLDivElement>(null);
    const rootRef = useRef<HTMLDivElement>(null);

    const handleInputChange = (key: string, value: string) => {
        setInputData((prevInputData) => ({
            ...prevInputData,
            [key]: value,
        }));
    };

    useEffect(() => {
        setIsModalOpen(true);

    }, [data]);

    useEffect(() => {
        if (errors && Object.keys(errors).length > 0 && !firstErrorRef.current) {
            const firstErrorKey = Object.keys(errors)[0];
            const firstErrorElement = document.getElementById(`form-group-section-${firstErrorKey}`);
            if (firstErrorElement) {
                firstErrorElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [errors]);

    const guessType = (name: string) => {
        if (fillable && fillable[name] && fillable[name].type) {
            return fillable[name].type;
        }
        return 'text';
    };

    interface RenderAsyncSelectProps {
        key: string;
        inputData: { [key: string]: string };
        isMulti?: boolean;
    }

    function renderAsyncSelect({ key, inputData, isMulti = false }: RenderAsyncSelectProps) {
        const defaultValue = inputData[key.replace(/_list/, '')] || (isMulti ? [] : '');

        return (
            <AsyncSelect
                id={key}
                className="form-control"
                name={isMulti ? `${key}[]` : key}
                key={key}
                defaultValue={defaultValue}
                isMulti={isMulti}
                cacheOptions
                defaultOptions
                loadOptions={() => getOptions(key)}
                getOptionValue={(option) => `${option['id']}`}
                getOptionLabel={(option) => `${option['name']}`}
            />
        );
    }

    return (
        <div ref={rootRef || null}>
            <div className={`modal fade`} id={`${id || 'AutoModel'}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden={`${isModalOpen ? 'true' : 'false'}`}>
                <div className={`modal-dialog ${computedSize}`}>
                    <div className="modal-content">
                        {data && isModalOpen ?
                            <div>
                                <div className="modal-header">
                                    <h5 className="modal-title" id="staticBackdropLabel">{`${data?.data?.id ? 'Edit' : 'Create'} ${modelName}`}</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form ref={formRef} method='post' action-url={actionUrl} onSubmit={(e: any) => emitAjaxPost(e)} className="flex justify-center">
                                        <div className="container-fluid">
                                            <input type="hidden" name="_method" value={method} />
                                            <div className="row">
                                                {hasFillable ? (
                                                    Object.keys(fillable).map((key) => {
                                                        const { input, type } = fillable[key];
                                                        key = key.replace(/_multilist$/, '_list')
                                                        return (
                                                            <div className={`col-12 ${computedSize !== 'modal-sm' ? 'col-md-6 col-xl-6' : ''}`}>
                                                                <div key={key} className="form-group mb-2" id={`form-group-section-${key}`}>
                                                                    <div className="mb-2 block">
                                                                        <label htmlFor="small">{convertToTitleCase(key)}</label>
                                                                    </div>
                                                                    {input === 'input' && type !== 'file' && (
                                                                        <input
                                                                            className="form-control"
                                                                            id={key}
                                                                            type={guessType(key)}
                                                                            name={key}
                                                                            value={inputData[key] || ''}
                                                                            onChange={(e) => handleInputChange(key, e.target.value)}
                                                                            key={key}
                                                                        />
                                                                    )}
                                                                    {input === 'input' && type === 'file' && (
                                                                        <input
                                                                            className="form-control"
                                                                            id={key}
                                                                            type="file"
                                                                            name={key}
                                                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                                const files = e.target.files;
                                                                                const fileNames = files ? Array.from(files).map((file) => file.name).join(', ') : '';
                                                                                handleInputChange(key, fileNames);
                                                                            }}
                                                                            key={key}
                                                                        />
                                                                    )}

                                                                    {input === 'select' && renderAsyncSelect({ key, inputData })}

                                                                    {input === 'multiselect' && renderAsyncSelect({ key, inputData, isMulti: true })}

                                                                    {input === 'textarea' && (
                                                                        <textarea
                                                                            id={key}
                                                                            className="form-control"
                                                                            name={key}
                                                                            value={inputData[key] || ''}
                                                                            onChange={(e) => handleInputChange(key, e.target.value)}
                                                                            key={key}
                                                                            rows={7}
                                                                        ></textarea>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        );
                                                    })
                                                ) : (
                                                    <p>Model has no fillable fields.</p>
                                                )}
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="submit" className="btn btn-primary">Submit</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            : 'Model data incomplete'
                        }
                    </div>
                </div>
                <button type="button" className="d-none" data-bs-toggle="modal" data-bs-target="#createModel"></button>
            </div>
        </div>
    );
};

export default AutoModel;
