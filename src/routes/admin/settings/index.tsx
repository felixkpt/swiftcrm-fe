
import rolePermissions from '@/routes/admin/settings/role-permissions'

const index = [

  {
    path: 'role-permissions',
    children: rolePermissions,
  },
]

export default index