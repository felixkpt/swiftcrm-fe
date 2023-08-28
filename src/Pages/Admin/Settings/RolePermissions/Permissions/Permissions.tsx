import AutoTable from '@/components/AutoTable';
import AutoModal from '@/components/AutoModal';
import { useState } from 'react';
import { ListSource } from '@/interfaces/Uncategorized';

const Permissions = () => {

  const [modelDetails, setModelDetails] = useState({})

  const list_sources = {
    guardName: async () => {
      return [
        {
          id: 'web',
          name: 'web',
        },
        {
          id: 'api',
          name: 'api',
        }
      ] as ListSource[];
    },
  };

  return (
    <div>
      <h3>Permissions List</h3>
      <div>
        <div className='d-flex justify-content-end'>
          <button type="button" className="btn btn-info text-white" data-bs-toggle="modal" data-bs-target="#CreatePermission">Create permission</button>
        </div>
        <AutoTable
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
          getModelDetails={setModelDetails}
          search={true}
          list_sources={list_sources}
        />
      </div>
      {
        modelDetails && <><AutoModal id={`CreatePermission`} modelDetails={modelDetails} actionUrl='/admin/settings/role-permissions/permissions' list_sources={list_sources} /></>
      }
    </div>
  );
};

export default Permissions;

