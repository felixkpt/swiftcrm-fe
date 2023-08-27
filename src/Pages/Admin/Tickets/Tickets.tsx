import AutoTable from '@/components/AutoTable';
import AutoModal from '@/components/AutoModal';
import { useState } from 'react';
import useAxios from '@/hooks/useAxios';

const Tickets = () => {
  const [data, setData] = useState({})

  const { data: users, loading: loadingUsers, errors: errorsUsers, get: getUsers } = useAxios()

  const list_sources = {
    async assignedToList() {
      const res = await getUsers('admin/settings/users?all=1').then((res:any) => res)
      return res || []

    }
  }

  return (
    <div>
      <h3>Tickets List</h3>
      <div>
        <div className='d-flex justify-content-end'>
          <button type="button" className="btn btn-info text-white" data-bs-toggle="modal" data-bs-target="#AutoModal">Create Ticket</button>
        </div>

        <AutoTable
          baseUri='/admin/tickets'
          columns={[
            {
              label: 'ID',
              key: 'id',
            },
            {
              label: 'Subject',
              key: 'subject',
            },

            {
              label: 'Created By',
              key: 'user_id',
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
        data && <><AutoModal data={data} actionUrl='/admin/tickets' list_sources={list_sources} /></>
      }
    </div>
  );
};

export default Tickets;

