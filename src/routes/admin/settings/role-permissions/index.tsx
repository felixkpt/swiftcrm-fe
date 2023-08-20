import CreateOrUpdatePermission from "@/Pages/Admin/Settings/RolePermissions/Permissions/CreateOrUpdatePermission"
import Permissions from "@/Pages/Admin/Settings/RolePermissions/Permissions/Permissions"
import Roles from "@/Pages/Admin/Settings/RolePermissions/Roles/Roles"
import ViewRole from "@/Pages/Admin/Settings/RolePermissions/ViewRole"

const index = [

  {
    path: 'roles',
    element: <Roles />,
  },
  {
    path: 'permissions',
    element: <Permissions />,
  },
  {
    path: 'permissions/create',
    element: <CreateOrUpdatePermission />,
  },
  {
    path: 'permissions/permission/:id/edit',
    element: <CreateOrUpdatePermission />,
  },
  {
    path: 'roles/:id',
    element: <ViewRole />,
  }
]

export default index