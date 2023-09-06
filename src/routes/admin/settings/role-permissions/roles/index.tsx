import Roles from '@/Pages/Admin/Settings/RolePermissions/Roles/Index';
import Role from '@/Pages/Admin/Settings/RolePermissions/Roles/Detail/Index';
import AuthenticatedLayout from '@/Layouts/Authenicated/AuthenticatedLayout';

const relativeUri = 'settings/role-permissions/roles/';

const index = [
    {
        path: '',
        element: <AuthenticatedLayout uri={relativeUri} permission="" Component={Roles} />,
    },
    {
        path: 'detail/:id',
        element: <AuthenticatedLayout uri={relativeUri + 'detail/:id'} permission="" Component={Role} />,
    },
];

export default index;
