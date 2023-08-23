import AutoTable from '@/components/AutoTable';
import AutoModel from '@/components/AutoModel';
import { useState } from 'react';

const Permissions = () => {

  const [key, setKey] = useState(0)

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
      <h3>Permissions List</h3>
      <div>
        <div className='d-flex justify-content-end'>
          <button type="button" className="btn btn-info text-white" data-bs-toggle="modal" data-bs-target="#CreatePermission">Create permission</button>
        </div>
        <AutoTable
          key={key}
          baseUri='/admin/settings/role-permissions/permissions'
          columns={[
            {
              label: 'ID',
              key: 'id',
            },
            {
              label: 'Permission Name',
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
        data && <><AutoModel setKey={setKey} id={`CreatePermission`} data={data} actionUrl='/admin/settings/role-permissions/permissions' list_sources={list_sources} /></>
      }
    </div>
  );
};

export default Permissions;

