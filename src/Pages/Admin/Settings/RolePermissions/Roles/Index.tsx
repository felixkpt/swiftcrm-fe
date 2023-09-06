import AutoTable from '@/components/AutoTable';
import AutoModal from '@/components/AutoModal';
import { useState } from 'react';
import usePermissions from '@/hooks/usePermissions';
import { ListSourceInterface } from '@/interfaces/UncategorizedInterfaces';
import PageHeader from '@/components/PageHeader';

const Index = () => {
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
      ] as ListSourceInterface[];
    },
  };

  return (
    <div>
      <PageHeader title={'Roles List'} action="button" actionText="Create role" actionTargetId="AutoModal" permission='admin.settings.role-permissions.roles' />
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
      {
        modelDetails && <><AutoModal modelDetails={modelDetails} actionUrl='/admin/settings/role-permissions/roles' list_sources={list_sources} /></>
      }
    </div>
  );
};

export default Index;

