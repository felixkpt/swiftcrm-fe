import AutoTable from '@/components/AutoTable';
import CreateModel from '@/components/CreateModel';
import React, { useEffect, useState } from 'react';

const Roles = () => {
  const [data, setData] = useState({})

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
              label: 'Guard Name',
              key: 'guard_name',
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
          search={true}
        />
      </div>
      {
        data && <><CreateModel data={data} actionUrl='/admin/settings/role-permissions/roles' /></>
      }
    </div>
  );
};

export default Roles;

