import AutoTable from '@/components/AutoTable'
import { useState } from 'react'
import AutoModal from '@/components/AutoModal'
import PageHeader from '@/components/PageHeader'

type Props = {}

const Index = (props: Props) => {

    const [data, setData] = useState([])

    return (

        <div>
            <PageHeader title={'Users List'} action="button" actionText="Create User" actionTargetId="AutoModal" permission='admin.settings.users' />
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
                getModelDetails={setData}
                search={true}
            />

            {
                data && <><AutoModal data={data} actionUrl='/admin/users' /></>
            }

        </div>
    )
}

export default Index