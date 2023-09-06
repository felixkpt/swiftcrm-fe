import { useEffect, useState } from 'react';
import useAxios from '@/hooks/useAxios';
import { useAuth } from '@/contexts/AuthContext';

const useRolePermissions = () => {
    const { get } = useAxios();
    const { user } = useAuth()

    const [roles, setRoles] = useState<RoleInterface[]>([]);
    const [currentRole, setCurrentRole] = useState<RoleInterface>();
    const [directPermissions, setDirectPermissions] = useState<PermissionInterface[]>([]);
    const [routePermissions, setRoutePermissions] = useState<PermissionInterface[]>([]);

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

    const fetchRoutePermissions = async (roleId = null, source: string = 'none') => {

        if (!user || !currentRole) return false

        // When roleId is give, let us NOT do refetching routePermissions if following condition fails
        if (roleId && String(currentRole.id) !== roleId) return false

        setLoadingRoutePermissions(true)

        try {
            const routePermissionsResponse = await get(`/admin/settings/role-permissions/roles/detail/${currentRole.id}/get-user-route-permissions`);

            if (routePermissionsResponse) {
                setRoutePermissions(routePermissionsResponse || []);
            }
        } catch (error) {
            // Handle error
        }

        setLoadingRoutePermissions(false)
    };

    useEffect(() => {
        if (user && roles.length > 0) {
            const defaultRole = user.default_role_id
                ? roles.find((role) => role.id === user.default_role_id)
                : null;

            setCurrentRole(defaultRole || roles[0]);
        }

    }, [roles]);

    useEffect(() => {
        if (roles && currentRole) {
            fetchRoutePermissions()
        }
    }, [user, currentRole, roles])

    return {
        user,
        roles,
        directPermissions,
        routePermissions,
        fetchRolesAndDirectPermissions,
        currentRole,
        setCurrentRole,
        fetchRoutePermissions,
        loadingRoutePermissions,
    };
};

export default useRolePermissions;
