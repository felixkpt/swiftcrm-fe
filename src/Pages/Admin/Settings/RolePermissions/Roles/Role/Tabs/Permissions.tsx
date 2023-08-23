import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '@/hooks/useAxios';
import { emitNotification } from '@/utils/helpers';
import PrepareRoutesTreeDraggable from '../Includes/PrepareRoutesTreeDraggable';
import Header from '../Includes/Header';

type Props = {
    role: RoleData
    permissions: PermissionData[]
    loadingPermission: boolean
    doGetPermissions: () => void
}

const Permissions: React.FC = ({ role, permissions, loadingPermission, doGetPermissions }: Props) => {

    const { id } = useParams<{ id: string }>();

    const roleUri = `admin/settings/role-permissions/roles/role/${id}`;
    const allPermissionsUri = `admin/settings/role-permissions/permissions/role/all`;
    const routesUri = 'admin/settings/role-permissions/permissions/routes';

    const { post: savePermissions, loading: savingPermissions } = useAxios();
    const { data: routes, get: getRoutes } = useAxios<RoleData>();
    const { data: allPermissions, get: getAllPermissions } = useAxios<PermissionData[]>();

    useEffect(() => {
        getRoutes(routesUri, { uri: 1 });
        getAllPermissions(allPermissionsUri, { uri: 1 });
    }, []);

    async function handleSubmit(checked: any) {

        await savePermissions(`${roleUri}/save-permissions`, {
            role_id: role.id,
            ...checked
        }).then((response) => {
            if (response) {
                emitNotification('Successfully saved role permissions', 'success');
                doGetPermissions();
            }
        });
    }

    // Memoize the component so it doesn't re-render unless `role`, `routes`, or `permissions` changes
    const memoizedComponent = useMemo(() => {

        return (
            <div>
                <Header permissions={permissions} loadingPermission={loadingPermission} role={role} />
                <div className="row">
                    <div className='col-sm-12'>
                        <div className='card mt-2'>
                            <div className='card-body'>
                                <div className="card-header">
                                    <h4>Permissions</h4>
                                </div>
                                {/* let us wait 4 roles, routes & permissions */}
                                {
                                    routes && permissions && allPermissions ?
                                        <PrepareRoutesTreeDraggable routes={routes} permissions={permissions} allPermissions={allPermissions} handleSubmit={handleSubmit} saving={savingPermissions} />
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
        )

    }, [permissions, allPermissions, routes, savingPermissions]);

    return memoizedComponent;
}

export default Permissions