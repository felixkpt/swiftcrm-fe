import AutoTable from '@/components/AutoTable';
import AutoModal from '@/components/AutoModal';
import { useState } from 'react';

const Statuses = () => {

  const [modelDetails, setModelDetails] = useState({})

  console.log(modelDetails)
  return (
    <div>
      <h3>Permissions List</h3>
      <div>
        <div className='d-flex justify-content-end'>
          <button type="button" className="btn btn-info text-white" data-bs-toggle="modal" data-bs-target="#Statuses">Create status</button>
        </div>
        <AutoTable
          baseUri='/admin/settings/picklists/statuses'
          columns={[
            {
              label: 'ID',
              key: 'id',
            },
            {
              label: 'Status Name',
              key: 'name',
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
      </div>
      {
        modelDetails && <><AutoModal id={`Statuses`} modelDetails={modelDetails} actionUrl='/admin/settings/picklists/statuses' /></>
      }
    </div>
  );
};

export default Statuses;