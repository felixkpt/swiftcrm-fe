import AutoTable from '@/components/AutoTable';
import AutoModal from '@/components/AutoModal';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import usePermissions from '@/hooks/usePermissions';

const Documentation = () => {
  const [data, setData] = useState({})

  const { checkPermission } = usePermissions()

  return (
    <div>
      <h3>Docs List</h3>
      <div>
        {
          checkPermission('documentation', 'post') &&
          <div className='d-flex justify-content-end'>
            <NavLink to={`/admin/documentation/create`} className="btn btn-info text-white">Create Doc</NavLink>
          </div>
        }
        
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
          setData={setData}
          search={true}
        />
      </div>
    </div>
  );
};

export default Documentation;

