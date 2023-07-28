import useAxios from '@/hooks/useAxios';
import { useEffect, useState } from 'react';
import { Route } from '@/interfaces';
import { useParams } from 'react-router-dom';
import RoutesTree from './Tabs/Includes/RoutesTree';

const ViewRole = () => {
    const { id } = useParams<{ id: string }>();
    const roleUri = 'admin/settings/role-permissions/roles/' + id;
    const uri = 'admin/settings/role-permissions/permissions/routes';

    const [routes, setRoutes] = useState<Route[] | null>(null);
    const { data, get, loading } = useAxios();
    const { data: role, get: getRole, loading: loadingRole } = useAxios();
    const { post: savePermissions, loading: loadingSavePermissions } = useAxios();

    useEffect(() => {
        if (id) {
            getRole(roleUri);
            get(uri);
        }
    }, [id]);

    useEffect(() => {
        if (!loading && data) {
            setRoutes(data);
        }
    }, [data, loading]);

    async function handleSubmit(checked: any) {
        const res = savePermissions(roleUri + '/save-permissions', { permissions: checked, role_id: role?.data.id });

    }

    return (
        <div>
            {role?.data && (
                <div className="mb-3">
                    <h3>Role Description</h3>
                    <table className="table table-bordered">
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>{role.data.name}</td>
                            </tr>
                            <tr>
                                <td>Guard Name</td>
                                <td>{role.data.guard_name}</td>
                            </tr>
                            <tr>
                                <td>Status</td>
                                <td>{role.data.status === 0 ? 'Inactive' : 'Active'}</td>
                            </tr>
                            <tr>
                                <td>Created At</td>
                                <td>{new Date(role.data.created_at).toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td>Updated At</td>
                                <td>{new Date(role.data.updated_at).toLocaleString()}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}

            <div className='col-12 col-lg-6'>
                <div className='card mt-2'>
                    <div className='card-body'>
                        <div className="card-header">
                            <h4>Permissions</h4>
                        </div>
                        {routes && <RoutesTree routes={routes} handleSubmit={handleSubmit} />}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ViewRole;
