import AutoTable from '@/components/AutoTable';
import PageHeader from '@/components/PageHeader';

const Documentation = () => {

  return (
    <div>
      <PageHeader title={'Docs List'} action="link" actionText="Create Doc" actionLink="/admin/documentation/create" permission='/admin/documentation' />
      <div>
        <AutoTable
          baseUri='/admin/documentation'
          columns={[
            {
              label: 'ID',
              key: 'id',
            },
            {
              label: 'Title',
              key: 'title',
            },
            {
              label: 'slug',
              key: 'slug',
            }, {
              label: 'Content Short',
              key: 'content_short',
            },
            {
              label: 'Created At',
              key: 'created_at',
            },
            {
              label: 'Status',
              key: 'status',
            },
            {
              label: 'Action',
              key: 'action',
            },
          ]}
          search={true}
        />
      </div>
    </div>
  );
};

export default Documentation;

