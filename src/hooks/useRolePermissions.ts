import { useEffect, useState } from 'react';
import useAxios from '@/hooks/useAxios';
import { useAuth } from '@/contexts/AuthContext';

const useRolePermissions = () => {
    const { get } = useAxios();
    const { user } = useAuth()

    const [roles, setRoles] = useState<RoleData[]>([]);
    const [currentRole, setCurrentRole] = useState<RoleData>();
    const [directPermissions, setDirectPermissions] = useState<PermissionData[]>([]);
    const [routePermissions, setRoutePermissions] = useState<PermissionData[]>([]);

    const [loadingRoutePermissions, setLoadingRoutePermissions] = useState(false)

    const fetchRolesAndDirectPermissions = async () => {

        if (!user) return false

        try {
            const rolesPermissions = await get('/admin/settings/role-permissions/roles/get-user-roles-and-direct-permissions');

            if (rolesPermissions) {
                setRoles(rolesPermissions.roles || []);
                setDirectPermissions(rolesPermissions.direct_permissions || []);
            }
        } catch (error) {
            // Handle error
        }
    };

    const fetchRoutePermissions = async () => {
        if (!user || !currentRole) return false

        setLoadingRoutePermissions(true)

        try {
            const routePermissionsResponse = await get(`/admin/settings/role-permissions/roles/role/${currentRole.id}/get-user-route-permissions`);

            if (routePermissionsResponse) {
                setRoutePermissions(routePermissionsResponse || []);
            }
        } catch (error) {
            // Handle error
        }

        setLoadingRoutePermissions(false)
    };

    useEffect(() => {
        if (roles) {
            if (!currentRole) setCurrentRole(roles[0])

            fetchRoutePermissions()
        }
    }, [user, currentRole, roles])

    return {
        user,
        roles,
        directPermissions,
        routePermissions,
        fetchRolesAndDirectPermissions,
        setCurrentRole,
        fetchRoutePermissions,
        loadingRoutePermissions,
    };
};

export default useRolePermissions;
