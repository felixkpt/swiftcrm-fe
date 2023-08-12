import AutoTable from '@/components/AutoTable';
import AutoModel from '@/components/AutoModel';
import { useState } from 'react';

const Documentation = () => {
  const [data, setData] = useState({})

  const list_sources = {
  }

  return (
    <div>
      <h3>Documentation List</h3>
      <div>
        <div className='d-flex justify-content-end'>
          <button type="button" className="btn btn-info text-white" data-bs-toggle="modal" data-bs-target="#AutoModel">Create Documentation</button>
        </div>

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
            },{
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
          setData={setData}
          search={true}
        />
      </div>
      {
        data && <><AutoModel data={data} actionUrl='/admin/documentation' list_sources={list_sources} /></>
      }
    </div>
  );
};

export default Documentation;

