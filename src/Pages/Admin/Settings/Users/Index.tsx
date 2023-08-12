import AutoTable from '@/components/AutoTable'
import { useState } from 'react'
import AutoModel from '@/components/AutoModel'

type Props = {}

const Index = (props: Props) => {

    const [data, setData] = useState([])

    return (

        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Users</h1>
            <div className='d-flex justify-content-end'>
                <button type="button" className="btn btn-info text-white" data-bs-toggle="modal" data-bs-target="#AutoModel">Create User</button>
            </div>

            <AutoTable
                baseUri='/admin/settings/users'
                columns={[
                    {
                        label: 'ID',
                        key: 'id',
                    },
                    {
                        label: 'User Name',
                        key: 'name',
                    },
                    {
                        label: 'Roles',
                        key: 'Roles',
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
                setData={setData}
                search={true}
            />

            {
                data && <><AutoModel data={data} actionUrl='/admin/settings/users' /></>
            }

        </div>
    )
}

export default Index