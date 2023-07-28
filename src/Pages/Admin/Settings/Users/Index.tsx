import useAxios from '@/hooks/useAxios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

type Props = {}

const Index = (props: Props) => {

    const { data, loading, get } = useAxios()

    const [users, setUsers] = useState([])


    useEffect(() => {
        get('admin/settings/users')
    }, [])

    useEffect(() => {
        if (loading === false && data)
            setUsers(data?.data)
    }, [data, loading])

    return (

        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Users</h1>
            <div className="d-flex w-full justify-content-end">
                <NavLink to="/admin/settings/users/create"
                    className="btn btn-outline-secondary">Create New User</NavLink>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-800">Name</th>
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-800">Email</th>
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-800">Roles</th>
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-800">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {
                        users &&
                        users.map((user: any) =>
                            <>
                                <tr>
                                    <td className="py-2 px-4">{user.name}</td>
                                    <td className="py-2 px-4">{user.email}</td>
                                    <td className="py-2 px-4">
                                        {
                                            user?.roles && user.roles.map((role:any) =>
                                                <>
                                                    <span className="inline-block bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs">{role.name}</span>
                                                </>)
                                        }
                                    </td>
                                    <td className="py-2 px-4 d-flex gap-1">
                                        <NavLink to={`/admin/settings/users/user/${user.id}/edit`}
                                            className="btn btn-outline-primary me-2">Edit</NavLink>
                                        <form action={`/admin/settings/users/user/${user.id}`} method="POST" className="inline-block">
                                            <input type="hidden" name='_method' value="delete" />
                                            <button type="submit" className="btn btn-outline-danger">Delete</button>
                                        </form>
                                    </td>
                                </tr>
                            </>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Index