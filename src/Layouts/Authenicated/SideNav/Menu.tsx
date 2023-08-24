import { useEffect, useMemo, useState } from 'react';
import useAxios from '@/hooks/useAxios';
import { useAuth } from '@/contexts/AuthContext';
import Str from '@/utils/Str';
import { Icon } from '@iconify/react/dist/iconify.js';
import MenuTree from './MenuTree';
import RoutesList from './RoutesList';
import Select from 'react-select';
import { useRolePermissionsContext } from '@/contexts/RolePermissionsContext';

const Menu = () => {

  const { data, get, loading, errors } = useAxios()
  const { user } = useAuth()
  const { roles, setCurrentRole } = useRolePermissionsContext();

  const [selectedRole, setSelectedRole] = useState<RoleData>()

  const [userMenu, setUserMenu] = useState(null)

  useEffect(() => {
    if (user && roles.length > 0) {
      setSelectedRole(user.default_role_id ? roles.find((role) => {
        return role.id === user.default_role_id
      }) : roles[0])
    }
  }, [roles]);

  useEffect(() => {

    if (selectedRole) {
      get('/admin/settings/role-permissions/roles/role/' + selectedRole.id + '/get-role-menu/?get-menu=1').then((resp) => {
        if (resp === undefined) {
          setUserMenu(null)
        }
      })

      setCurrentRole(selectedRole)
    }

  }, [selectedRole])

  useEffect(() => {

    if (!loading && !errors && data) {
      setUserMenu(data?.menu)
    }

  }, [loading])

  const memoizeMenu = useMemo(() => {

    return <>
      {
        user && userMenu !== null ?
          <div className='shadow'>
            <ul className="metismenu list-unstyled nested-routes main" id="menu">

              {
                userMenu.map((child, i) => {

                  const { routes, children, icon, folder } = child

                  const shouldShowFirstLevelRoutes = true

                  const shouldShowFolder = routes.length > 0 || children.length > 0

                  const currentId = Str.slug((folder).replace(/^\//, ''));

                  const indent = 2

                  if (shouldShowFolder)

                    return (
                      <div key={currentId}>
                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target={`#${currentId}`} aria-expanded="false" aria-controls="collapsePages">
                          <span className='d-flex align-items-center gap-1'>
                            <Icon icon={`${icon || 'prime:bookmark'}`} />
                            <span>{Str.title(Str.afterLast(folder, '/'))}</span>
                          </span>
                          <div className="sb-sidenav-collapse-arrow"><Icon className='arrow-section' icon={`bi-chevron-down`} /></div>
                        </a>
                        <div className="collapse" id={`${currentId}`} aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                          <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                            <RoutesList routes={routes} />
                            {
                              children.length > 0 &&
                              <>
                                {
                                  children.map((child) => <MenuTree key={child.folder} indent={indent} child={child} prevId={currentId} />)
                                }
                              </>
                            }
                          </nav>
                        </div>
                      </div>
                    )

                  else return null
                })
              }
            </ul>
          </div>
          :
          <>
            {!selectedRole || loading ?
              <div className="d-flex align-items-center gap-3 ps-3 pt-3">
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Loading...
              </div>
              :
              `No menus associated with your role.`
            }
          </>
      }
    </>

  }, [user, userMenu])

  if (selectedRole)
    return (
      <div className='px-1'>
        <Select
          className="basic-single text-dark mb-2"
          classNamePrefix="select"
          defaultValue={selectedRole}
          isSearchable={true}
          name="roles"
          options={roles}
          getOptionValue={(option) => `${option['id']}`}
          getOptionLabel={(option) => `${option['name']}`}
          onChange={(item) => setSelectedRole(item)}
          onChange={(item) => setSelectedRole(item)}
        />
        {memoizeMenu}
      </div>
    )
};

export default Menu;
