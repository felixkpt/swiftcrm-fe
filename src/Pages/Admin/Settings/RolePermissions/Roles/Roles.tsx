import AutoTable from '@/components/AutoTable';
import AutoModal from '@/components/AutoModal';
import { useState } from 'react';

const Roles = () => {
  const [data, setData] = useState({})

  const list_sources = {

    async guardName() {
      return [
        {
          id: 'web',
          name: 'web',
        },
        {
          id: 'api',
          name: 'api',
        }
      ]
    },
  }

  return (
    <div>
      <h3>Roles List</h3>
      <div>
        <div className='d-flex justify-content-end'>
          <button type="button" className="btn btn-info text-white" data-bs-toggle="modal" data-bs-target="#AutoModal">Create role</button>
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
        data && <><AutoModal data={data} actionUrl='/admin/settings/role-permissions/roles' list_sources={list_sources} /></>
      }
    </div>
  );
};

export default Roles;

