import AutoTable from '@/components/AutoTable';
import PageHeader from '@/components/PageHeader';

const Documentation = () => {

  return (
    <div>
      <PageHeader title={'Docs List'} action="link" actionText="Create Doc" actionLink="/admin/docs/create" permission='/admin/docs' />
      <div>
        <AutoTable
          baseUri='/admin/docs'
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

