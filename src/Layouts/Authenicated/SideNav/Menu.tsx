import React, { useEffect, useMemo, useState } from 'react';
import useAxios from '@/hooks/useAxios';
import { useAuth } from '@/contexts/AuthContext';
import Str from '@/utils/Str';
import { Icon } from '@iconify/react/dist/iconify.js';
import MenuTree from './MenuTree';
import RoutesList from './RoutesList';
import Select from 'react-select';

// Constants used for managing the component behavior
const PARENT_FOLDER_ID_PREFIX = 'menu-parent-folder-';

function handleToggle(key: string) {
  const target = document.getElementById(key);

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
  const { user } = useAuth()

  const [selectedRoleId, setSelectedRoleId] = useState<string>()

  const [userMenu, setUserMenu] = useState(null)

  useEffect(() => {
    if (user) setSelectedRoleId(user.roles[0]?.id)
  }, [user]);

  useEffect(() => {

    if (selectedRoleId) {
      get('/admin/settings/role-permissions/roles/get-menu/' + selectedRoleId + '?get-menu=1').then((resp) => {
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

  const memoizeMenu = useMemo(() => {

    return <>
      {
        user && userMenu !== null ?
          <div className='bg-gray-50 shadow sm:w-full'>
            <ul className='list-unstyled nested-routes main'>
              {
                userMenu.map((child, i) => {

                  const { routes, children, hidden, icon, folder } = child

                  const shouldShowFirstLevelRoutes = true

                  const shouldShowFolder = routes.length > 0 || children.length > 0 && !hidden

                  const currentId = Str.slug((folder).replace(/^\//, ''));

                  const indent = 1

                  return (

                    <div key={currentId}>
                      {
                        shouldShowFolder &&
                        <li className='pb-1' id={`${PARENT_FOLDER_ID_PREFIX}${currentId}`}>
                          <div className='toggler-section px-1 rounded d-flex rounded-lg'>
                            <label className='toggler p-2 text-base d-flex align-items-center gap-1 justify-content-between flex-grow-1' onClick={() => handleToggle(currentId)}>
                              <span className='d-flex align-items-center gap-1'>
                                <Icon icon={`${icon || 'prime:bookmark'}`} />
                                <span>{Str.title(Str.afterLast(folder, '/'))}</span>
                              </span>
                              <Icon className='arrow-section' icon={`bi-chevron-down`} />
                            </label>
                          </div>

                          <ul id={currentId} className={`list-unstyled ps-${indent} ${shouldShowFirstLevelRoutes ? '' : 'd-none'} my-1`}>
                            <RoutesList routes={routes} />
                            <>
                              {
                                children.length > 0 &&
                                <li className={`ps-${indent}`}>
                                  <ul className={`list-unstyled`}>
                                    {
                                      children.map((child) => <MenuTree key={child.folder} indent={indent} child={child} handleToggle={handleToggle} />)
                                    }
                                  </ul>
                                </li>
                              }
                            </>
                          </ul>

                        </li>
                      }
                    </div>

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
      defaultValue={user?.roles[0]}
      isSearchable={true}
      name="roles"
      options={user?.roles}
      getOptionValue={(option) => `${option['id']}`}
      getOptionLabel={(option) => `${option['name']}`}
      onChange={(item) => setSelectedRoleId(item.id)}

    />
    {memoizeMenu}
  </div>

};

export default Menu;
