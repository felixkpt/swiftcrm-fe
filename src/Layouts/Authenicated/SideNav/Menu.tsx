import React, { useEffect, useMemo, useState } from 'react';
import useAxios from '@/hooks/useAxios';
import { useAuth } from '@/contexts/AuthContext';
import Str from '@/utils/Str';
import { Icon } from '@iconify/react/dist/iconify.js';
import MenuTree from './MenuTree';
import RoutesList from './RoutesList';
import Select from 'react-select';
import MetisMenu from 'metismenujs';

// Constants used for managing the component behavior
const PARENT_FOLDER_ID_PREFIX = 'menu-parent-folder-';

function handleToggle(key: string) {
  const target = document.getElementById(key);

  return

  if (target) {

    const isHidden = target.classList.contains('d-none')

    if (isHidden) {
      target.classList.remove('d-none');

    } else {

      target.classList.add('d-none');
    }


    const parent = target?.closest(`li[id^="${PARENT_FOLDER_ID_PREFIX}"]`)
    if (parent) {
      parent.classList.toggle('active')
    }

  }
}

const Menu = () => {

  const { data, get, loading, errors } = useAxios()
  const { user, roles } = useAuth()

  const [selectedRoleId, setSelectedRoleId] = useState<string>()

  const [userMenu, setUserMenu] = useState(null)

  useEffect(() => {
    if (user && roles.length > 0) setSelectedRoleId(roles[0]?.id)
  }, [user]);

  useEffect(() => {

    if (selectedRoleId) {
      get('/admin/settings/role-permissions/roles/get-role-menu/' + selectedRoleId + '?get-menu=1').then((resp) => {
        if (resp === undefined) {
          setUserMenu(null)
        }
      })
    }

  }, [selectedRoleId])

  useEffect(() => {

    if (!loading && !errors && data) {
      setUserMenu(data?.menu)
    }

  }, [loading])

  useEffect(() => {
    if (userMenu) {
      // create new instance
      new MetisMenu('#menu', {});

    }

  }, [userMenu])

  const memoizeMenu = useMemo(() => {

    return <>
      {
        user && userMenu !== null ?
          <div className='bg-gray-50 shadow sm:w-full'>
            <ul className="metismenu list-unstyled nested-routessmain" id="menu">

              {
                userMenu.map((child, i) => {

                  const { routes, children, hidden, icon, folder } = child

                  const shouldShowFirstLevelRoutes = true

                  const shouldShowFolder = routes.length > 0 || children.length > 0

                  const currentId = Str.slug((folder).replace(/^\//, ''));

                  const indent = 2

                  return (

                    <>
                      {
                        shouldShowFolder &&

                        <div>
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
                                    children.map((child) => <MenuTree key={child.folder} indent={indent} child={child} handleToggle={handleToggle} prevId={currentId} />)
                                  }
                                </>
                              }

                            </nav>
                          </div>
                        </div>
                      }
                    </>

                  )
                })
              }
            </ul>
          </div>
          :
          <>
            {loading ?
              <div className="d-flex align-items-center gap-3">
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

  return <div className='px-1'>
    <Select
      className="basic-single text-dark mb-2"
      classNamePrefix="select"
      defaultValue={roles[0]}
      isSearchable={true}
      name="roles"
      options={roles}
      getOptionValue={(option) => `${option['id']}`}
      getOptionLabel={(option) => `${option['name']}`}
      onChange={(item) => setSelectedRoleId(item.id)}
    />
    {memoizeMenu}
  </div>
};

export default Menu;
