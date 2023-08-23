import Roles from '@/Pages/Admin/Settings/RolePermissions/Roles/Roles';
import Permissions from '@/Pages/Admin/Settings/RolePermissions/Permissions/Permissions';
import CreateOrUpdatePermission from '@/Pages/Admin/Settings/RolePermissions/Permissions/CreateOrUpdatePermission';
import Role from '@/Pages/Admin/Settings/RolePermissions/Roles/Role/Index';
import AuthenticatedLayout from '@/Layouts/Authenicated/AuthenticatedLayout';

const relativeUri = 'settings/role-permissions/';

const index = [
    {
        path: 'roles',
        element: <AuthenticatedLayout uri={relativeUri + 'roles'} permission="" Component={Roles} />,
    },
    {
        path: 'roles/role/:id',
        element: <AuthenticatedLayout uri={relativeUri + 'roles/role/:id'} permission="" Component={Role} />,
    },
    {
        path: 'permissions',
        element: <AuthenticatedLayout uri={relativeUri + 'permissions'} permission="" Component={Permissions} />,
    },
    {
        path: 'permissions/create',
        element: <AuthenticatedLayout uri={relativeUri + 'permissions/create'} permission="" Component={CreateOrUpdatePermission} />,
    },
    {
        path: 'permissions/permission/:id/edit',
        element: <AuthenticatedLayout uri={relativeUri + 'permissions/permission/:id/edit'} permission="" Component={CreateOrUpdatePermission} />,
    },
];

export default index;
