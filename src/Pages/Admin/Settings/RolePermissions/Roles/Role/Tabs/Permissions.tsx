import React, { useEffect, useMemo, useState } from 'react';
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

    const allPermissionsUri = `admin/settings/role-permissions/permissions/role/all`;
    const routesUri = 'admin/settings/role-permissions/permissions/routes';

    const { data: routes, get: getRoutes } = useAxios<RouteCollection[]>();
    const { data: allPermissions, get: getAllPermissions } = useAxios<PermissionData[]>();

    useEffect(() => {
        getRoutes(routesUri, { uri: 1 });
        getAllPermissions(allPermissionsUri, { uri: 1 });
    }, []);

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
                                        <PrepareRoutesTreeDraggable role={role} routes={routes} permissions={permissions} allPermissions={allPermissions} />
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

    }, [permissions, allPermissions, routes]);

    return memoizedComponent;
}

export default Permissions