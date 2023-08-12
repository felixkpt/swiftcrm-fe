import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useRoleRoutes from '@/hooks/apis/useRoleRoutes';
import useAxios from '@/hooks/useAxios';
import { emitNotification } from '@/utils/helpers';
import PrepareRoutesTree from './Tabs/Includes/PrepareRoutesTree';

const ViewRole: React.FC = () => {
    console.log('Render ViewRole');
    const { id } = useParams<{ id: string }>();
    const roleUri = `admin/settings/role-permissions/roles/${id}`;
    const permissionsUri = `admin/settings/role-permissions/permissions/role/${id}`;
    const allPermissionsUri = `admin/settings/role-permissions/permissions/role/all`;
    const routesUri = 'admin/settings/role-permissions/permissions/routes';

    const { post: savePermissions, loading: savingPermissions } = useAxios();

    const { role, routes } = useRoleRoutes(roleUri, routesUri);
    const { data: permissions, get: getPermissions, loading: loadingPermission } = useAxios<PermissionData[]>();
    const { data: allPermissions, get: getAllPermissions, loading: loadingAllPermissions } = useAxios<PermissionData[]>();

    useEffect(() => {
        getPermissions(permissionsUri, { uri: 1 });
        getAllPermissions(allPermissionsUri, { uri: 1 });
    }, []);

    async function handleSubmit(checked: any) {

        // console.log(checked)

        await savePermissions(`${roleUri}/save-permissions`, {
            role_id: role.id,
            ...checked
        }).then((response) => {
            if (response) {
                emitNotification('Successfully saved role permissions', 'success');
                getPermissions(permissionsUri, { uri: 1 });
            }
        });
    }

    // Memoize the component so it doesn't re-render unless `role`, `routes`, or `permissions` changes
    const memoizedComponent = useMemo(() => {

        return <div>
            {role && (
                <div className="mb-3">
                    <h3>Role Description</h3>
                    <table className="table table-bordered">
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>{role.name}</td>
                            </tr>
                            <tr>
                                <td>Guard Name</td>
                                <td>{role.guard_name}</td>
                            </tr>
                            <tr>
                                <td>Permissions counts</td>
                                <td>{loadingPermission ? 'Counting...' : permissions?.length || 0}</td>
                            </tr>
                            <tr>
                                <td>Status</td>
                                <td>{role.status === 0 ? 'Inactive' : 'Active'}</td>
                            </tr>
                            <tr>
                                <td>Created At</td>
                                <td>{new Date(role.created_at).toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td>Updated At</td>
                                <td>{new Date(role.updated_at).toLocaleString()}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}

            <div className="row">
                <div className='col-sm-12'>
                    <div className='card mt-2'>
                        <div className='card-body'>
                            <div className="card-header">
                                <h4>Permissions</h4>
                            </div>
                            {/* let us wait 4 roles, routes & permissions */}
                            {role && routes && permissions && allPermissions ?
                                <PrepareRoutesTree routes={routes} permissions={permissions} allPermissions={allPermissions} handleSubmit={handleSubmit} saving={savingPermissions} />
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

    }, [role, permissions, allPermissions, routes, savingPermissions]);

    return memoizedComponent;
};

export default ViewRole;
