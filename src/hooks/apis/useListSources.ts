import useAxios from '../useAxios'

const useListSources = () => {

  const { get } = useAxios()

  const permissions = {

    async rolesList() {
      const res = await get('admin/settings/role-permissions/roles?all=1').then((res) => res)
      return res || []

    },

    async directPermissionsList() {
      const res = await get('admin/settings/role-permissions/permissions?all=1').then((res) => res)
      return res || []

    }
  }

  return {
    permissions
  }
}

export default useListSources