import CreateOrUpdatePermission from "@/Pages/Admin/Settings/RolePermissions/Permissions/CreateOrUpdatePermission"
import Permissions from "@/Pages/Admin/Settings/RolePermissions/Permissions/Permissions"
import Roles from "@/Pages/Admin/Settings/RolePermissions/Roles/Roles"
import ViewRole from "@/Pages/Admin/Settings/RolePermissions/ViewRole"
import CreateOrUpdateUser from "@/Pages/Admin/Settings/Users/CreateOrUpdateUser"
import Index from "@/Pages/Admin/Settings/Users/User/Index"
import Profile from "@/Pages/User/Profile"
import Users from '@/Pages/Admin/Settings/Users/Index';

const index = [

  {
    path: 'user/profile',
    element: <Profile />,
  },
  {
    path: 'role-permissions/roles',
    element: <Roles />,
  },
  {
    path: 'role-permissions/permissions',
    element: <Permissions />,
  },
  {
    path: 'role-permissions/permissions/create',
    element: <CreateOrUpdatePermission />,
  },
  {
    path: 'role-permissions/permissions/permission/:id/edit',
    element: <CreateOrUpdatePermission />,
  },
  {
    path: 'role-permissions/roles/:id',
    element: <ViewRole />,
  },
  {
    path: 'users',
    element: <Users />,
  },
  {
    path: 'users/create',
    element: <CreateOrUpdateUser />,
  },
  {
    path: 'users/user/:id/edit',
    element: <CreateOrUpdateUser />,
  },
  {
    path: 'users/user/:id',
    element: <Index />,
  },

]

export default index