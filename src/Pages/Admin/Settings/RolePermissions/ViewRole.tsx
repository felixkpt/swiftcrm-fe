import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import RoutesTree from './Tabs/Includes/RoutesTree';
import useRoleRoutes from '../../../../hooks/apis/useRoleRoutes';
import useAxios from '@/hooks/useAxios';
import { emitNotification } from '@/utils/helpers';

const ViewRole = () => {
    console.log('Render ViewRole');
    const { id } = useParams<{ id: string }>();
    const roleUri = 'admin/settings/role-permissions/roles/' + id;
    const permissionsUri = 'admin/settings/role-permissions/permissions/role/' + id;
    const routesUri = 'admin/settings/role-permissions/permissions/routes';

    const { post: savePermissions, loading: savingPermissions } = useAxios();

    const { role, routes } = useRoleRoutes(roleUri, routesUri);
    const { data: permissions, get: getPermissions, loading: loadingPermission } = useAxios();

    useEffect(() => {
        getPermissions(permissionsUri, { uri: 1 });
    }, [])

    async function handleSubmit(checked: any) {

        await savePermissions(roleUri + '/save-permissions', { permissions: checked.permissions, folder_icons: checked.folder_icons, hidden_folders: checked.hidden_folders, role_id: role?.data.id })
            .then(() => {
                emitNotification('Successfully saved role permissions', 'success')
                getPermissions(permissionsUri, { uri: 1 });
            });
    }

    // Memoize the component so it doesn't re-render unless `role`, `routes`, or `permissions` changes
    const memoizedComponent = useMemo(() => {

        return <div>
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
                                <td>Permissions counts</td>
                                <td>{loadingPermission ? 'Counting...' : permissions?.data?.length || 0}</td>
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

            <div className="row">
                <div className='col-12 col-lg-7 col-xl-7'>
                    <div className='card mt-2'>
                        <div className='card-body'>
                            <div className="card-header">
                                <h4>Permissions</h4>
                            </div>
                            {/* let us wait 4 roles, routes & permissions */}
                            {role?.data && routes?.data && permissions?.data ?
                                <RoutesTree routes={routes.data} permissions={permissions.data} handleSubmit={handleSubmit} saving={savingPermissions} />
                                :
                                <div className='mt-2 p-2'>
                                    {true ?
                                        <div className="d-flex align-items-center justify-content-center gap-3">
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            Loading...
                                        </div>
                                        :
                                        `No routes defined.`
                                    }
                                </div>
                            }

                        </div>

                    </div>
                </div>
            </div>
        </div>

    }, [role, permissions, routes, savingPermissions]);

    return memoizedComponent;
};

export default ViewRole;
