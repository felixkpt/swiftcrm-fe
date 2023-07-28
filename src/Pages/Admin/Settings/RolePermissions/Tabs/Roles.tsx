import AutoTable from '@/components/AutoTable';
import CreateModel from '@/components/CreateModel';
import AutoModal from '@/components/Modals/AutoModal';
import useAxios from '@/hooks/useAxios';
import React, { useEffect, useState } from 'react';

const Roles = () => {
  const [data, setData] = useState({})

  useEffect(() => {
  }, [data])


  // const handleView = (rowData: object | null) => {
  //   setSelectedRow(rowData);
  //   setModalAction('view');
  //   setViewModalOpen(true);
  // };

  // const handleCreate = (rowData: object | null) => {
  //   setSelectedRow(null);
  //   setModalAction('create');
  //   setCreateOrEditModalOpen(true);
  // };

  // const handleEdit = (rowData: object | null) => {
  //   setSelectedRow(rowData);
  //   setModalAction('edit');
  //   setCreateOrEditModalOpen(true);
  // };

  // const handleDelete = (rowData: object | null) => {
  //   setSelectedRow(rowData);
  //   setModalAction('delete');
  //   setDeleteModalOpen(true);
  // };


  // function response(response: ResponseData) {
  //   if (response.type === 'success' || response.type === 'cancelled') {
  //       if (modalAction === 'view') setViewModalOpen(false);
  //       if (modalAction === 'create') setCreateOrEditModalOpen(false);
  //       if (modalAction === 'edit') setCreateOrEditModalOpen(false);
  //       if (modalAction === 'delete') setDeleteModalOpen(false);

  //       if (response.type === 'success') setReload((prev: number) => prev + 1);
  //   } else if (response.type === 'cancelled') {
  //       console.log(reportError);
  //   }
  // }

  // function deleteResponse(response: ResponseData) {
  //   console.log(response);
  //   setDeleteModalOpen(false);
  //   setReload((prev: number) => prev + 1);
  // }

  // const handleChecked = (checked: boolean, itemId: string | null) => {
  //   if (modelDataLength <= 0) return;

  //   if (itemId !== null) {
  //       if (checked) {
  //           // Add the item ID to checkedItems
  //           setCheckedItems((prev) => [...prev, itemId]);
  //       } else {
  //           // Remove the item ID from checkedItems
  //           setCheckedItems((prevCheckedItems) =>
  //               prevCheckedItems.filter((id) => id !== itemId)
  //           );
  //       }
  //   } else {
  //       if (checked) {
  //           // Check all items
  //           const allIds = tableData.data.map((row) => row.id);
  //           setCheckedItems(allIds);
  //       } else {
  //           // Uncheck all items
  //           setCheckedItems([]);
  //       }
  //   }
  // };


  return (
    <div>
      <h3>Roles List</h3>
      <div>
        <div className='d-flex justify-content-end'>
          <button type="button" className="btn btn-info text-white" data-bs-toggle="modal" data-bs-target="#createModel">Create role</button>
        </div>
        <AutoTable
          baseUri='/admin/settings/role-permissions/roles'
          columns={[
            {
              label: 'ID',
              key: 'id',
            },
            {
              label: 'Role Name',
              key: 'name',
            },
            {
              label: 'Created At',
              key: 'created_at',
            },
            {
              label: 'Action',
              key: 'action',
            },
          ]}
          setData={setData}
        />
      </div>
      {
        data && <><CreateModel data={data} actionUrl='/admin/settings/role-permissions/roles' /></>
      }
    </div>
  );
};

export default Roles;

