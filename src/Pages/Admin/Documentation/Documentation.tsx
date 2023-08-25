import AutoTable from '@/components/AutoTable';
import AutoModel from '@/components/AutoModel';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Documentation = () => {
  const [data, setData] = useState({})

  const list_sources = {
  }

  return (
    <div>
      <h3>Docs List</h3>
      <div>
        <div className='d-flex justify-content-end'>
          <NavLink to={`/admin/documentation/create`} className="btn btn-info text-white">Create Doc</NavLink>
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
     </div>
  );
};

export default Documentation;

