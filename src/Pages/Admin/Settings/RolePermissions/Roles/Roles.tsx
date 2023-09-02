import AutoTable from '@/components/AutoTable';
import AutoModal from '@/components/AutoModal';
import { useState } from 'react';
import usePermissions from '@/hooks/usePermissions';
import { ListSource } from '../../../../../interfaces/UncategorizedInterfaces';

const Roles = () => {
  const [modelDetails, setModelDetails] = useState({})
  const { checkPermission } = usePermissions()

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
      <h3>Roles List</h3>
      <div>
        <div className='d-flex justify-content-end'>
          {
            checkPermission('admin.settings.role-permissions.roles', 'post') &&
            <div className='d-flex justify-content-end'>
              <button type="button" className="btn btn-info text-white" data-bs-toggle="modal" data-bs-target="#AutoModal">Create role</button>
            </div>
          }

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
          getModelDetails={setModelDetails}
          search={true}
        />
      </div>
      {
        modelDetails && <><AutoModal modelDetails={modelDetails} actionUrl='/admin/settings/role-permissions/roles' list_sources={list_sources} /></>
      }
    </div>
  );
};

export default Roles;

