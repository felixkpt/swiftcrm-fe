import useRolePermissions from '@/hooks/useRolePermissions';
import React, { createContext, useContext } from 'react';

interface RolePermissionsContextType {
    roles: RoleData[];
    directPermissions: PermissionData[];
    routePermissions: PermissionData[];
    fetchRolesAndDirectPermissions: () => void;
    fetchRoutePermissions: (roleId?: string) => void;
    loadingRoutePermissions: boolean
    setCurrentRole: (role: RoleData) => void
}

const RolePermissionsContext = createContext<RolePermissionsContextType | undefined>(undefined);

export const RolePermissionsProvider: React.FC = ({ children }) => {
    const rolePermissions = useRolePermissions();

    return (
        <RolePermissionsContext.Provider value={rolePermissions}>
            {children}
        </RolePermissionsContext.Provider>
    );
};

export const useRolePermissionsContext = () => {
    const context = useContext(RolePermissionsContext);
    if (!context) {
        throw new Error('useRolePermissionsContext must be used within a RolePermissionsProvider');
    }
    return context;
};
