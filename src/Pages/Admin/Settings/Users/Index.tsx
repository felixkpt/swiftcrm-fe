import AutoTable from '@/components/AutoTable'
import useAxios from '@/hooks/useAxios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

type Props = {}

const Index = (props: Props) => {

    const [data, setData] = useState([])

    return (

        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Users</h1>
            <div className="d-flex w-full justify-content-end">
                <NavLink to="/admin/settings/users/create"
                    className="btn btn-outline-secondary">Create New User</NavLink>
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
        </div>
    )
}

export default Index