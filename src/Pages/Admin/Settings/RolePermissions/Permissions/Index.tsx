import AutoTable from '@/components/AutoTable';
import AutoModal from '@/components/AutoModal';
import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import { ListSourceInterface } from '@/interfaces/UncategorizedInterfaces';

const Index = () => {

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
      ] as ListSourceInterface[];
    },
  };

  return (
    <div>
      <PageHeader title={'Permissions List'} action="button" actionText="Create permission" actionTargetId="CreatePermission" permission='/admin/settings/role-permissions/permissions' />
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
      {
        modelDetails && <><AutoModal id={`CreatePermission`} modelDetails={modelDetails} actionUrl='/admin/settings/role-permissions/permissions' list_sources={list_sources} /></>
      }
    </div>
  );
};

export default Index;

