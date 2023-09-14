import AutoTable from '@/components/AutoTable';
import PageHeader from '@/components/PageHeader';

interface Props {
  category?: any
}

const Documentation = ({ category }: Props) => {

    return (
    <div>
      <PageHeader title={'Docs List'} action="link" actionText="Create Doc" actionLink={`/admin/docs/create?category_id=${category ? category.id : '0'}`} permission='/admin/docs' />
      <div>
        <AutoTable
          baseUri={`/admin/docs?category_id=${category ? category.id : '0'}`}
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

