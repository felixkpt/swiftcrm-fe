
import picklists from '@/routes/admin/settings/picklists'
import rolePermissions from '@/routes/admin/settings/role-permissions'

const index = [

  {
    path: 'picklists',
    children: picklists,
  },
  {
    path: 'role-permissions',
    children: rolePermissions,
  },
]

export default index