import AutoTable from '@/components/AutoTable';
import AutoModal from '@/components/AutoModal';
import { useState } from 'react';
import { ListSourceInterface } from '@/interfaces/UncategorizedInterfaces';
import PageHeader from '@/components/PageHeader';

const Index = () => {
  const [modelDetails, setModelDetails] = useState({})

  const list_sources = {
  };

  return (
    <div>
      <PageHeader title={'Categories List'} action="button" actionText="Create Category" actionTargetId="AutoModal" permission='/admin/docs/categories' />
      <AutoTable
        baseUri='/admin/docs/categories'
        columns={[
          {
            label: 'ID',
            key: 'id',
          },
          {
            label: 'Category Title',
            key: 'title',
          },
          {
            label: 'Category Slug',
            key: 'slug',
          },
          {
            label: 'Action',
            key: 'action',
          }

        ]}
        getModelDetails={setModelDetails}
        search={true}
      />
      {
        modelDetails && <><AutoModal modelDetails={modelDetails} actionUrl='/admin/docs/categories' list_sources={list_sources} /></>
      }
    </div>
  );
};

export default Index;

