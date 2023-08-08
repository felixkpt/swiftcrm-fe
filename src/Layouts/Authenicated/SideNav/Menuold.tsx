import React, { useEffect, useState } from 'react';
import useAxios from '@/hooks/useAxios';
import { useAuth } from '@/contexts/AuthContext';
import Str from '@/utils/Str';
import { Icon } from '@iconify/react/dist/iconify.js';
import MenuTree from './MenuTree';
import RoutesList from './RoutesList';

// Constants used for managing the component behavior
const MAIN_CONTAINER_CLASS = 'nested-routes';
const PARENT_FOLDER_ID_PREFIX = 'parent-folder-menu-';

function handleToggle(key: string) {
  const target = document.getElementById(key);
  if (target) {

    const isHidden = target.classList.contains('nav-item-hidden')

    if (isHidden === true) {
      target.classList.remove('d-none');
      setTimeout(() => {
        target.classList.add('nav-item-shown');
        target.classList.remove('nav-item-hidden');

      }, 200);
    } else {
      target.classList.remove('nav-item-shown');
      target.classList.add('nav-item-hidden');

      setTimeout(() => {
        target.classList.add('d-none');

      }, 800);
    }


    const parent = target?.closest(`li[id^="${PARENT_FOLDER_ID_PREFIX}"]`)
    if (parent) {
      parent.classList.toggle('active')
    }

  }


}

const Menu = () => {

  const { data, get, loading } = useAxios()
  const { user } = useAuth()

  const [selectedRoleId, setSelectedRoleId] = useState<string>()

  const [userMenu, setUserMenu] = useState(null)

  useEffect(() => {
    if (user) setSelectedRoleId(user.roles[0]?.id)
  }, [user]);

  useEffect(() => {

    if (selectedRoleId) {
      get('/admin/settings/role-permissions/roles/get-menu/' + selectedRoleId + '?get-menu=1')
    }

  }, [selectedRoleId])

  useEffect(() => {

    if (!loading && data) {
      setUserMenu(data?.menu)
    }

  }, [loading])

  return (
    <div>
      {
        user && userMenu !== null ?
          <div className='bg-gray-50 shadow sm:w-full px-2'>
            <select className='w-100 mb-2' onChange={(e) => setSelectedRoleId(e.target.value)}>
              {
                user.roles?.map((role) => <option key={role.id} value={role.id}>{role.name}</option>)
              }
            </select>
            <h4>Menu</h4>

            <ul className='list-unstyled nested-routes main'>
              {
                userMenu.map((child, i) => {

                  const { routes, children, hidden, icon, folder } = child

                  const shouldShowFirstLevelRoutes = true

                  const shouldShowFolder = routes.length > 0 || children.length > 0 && !hidden

                  const currentId = Str.slug((folder).replace(/^\//, ''));

                  const indent = 1

                  return (

                    <>
                      {
                        shouldShowFolder &&
                        <li key={currentId} className='pb-1' id={`${PARENT_FOLDER_ID_PREFIX}${currentId}`}>
                          <div className='toggler-section px-1 rounded d-flex rounded-lg'>
                            <label className='toggler p-2 text-base d-flex align-items-center gap-1 justify-content-between flex-grow-1' onClick={() => handleToggle(currentId)}>
                              <span className='d-flex align-items-center gap-1'>
                                <Icon icon={`${icon || 'prime:bookmark'}`} />
                                <span>{Str.title(Str.afterLast(folder, '/'))}</span>
                              </span>
                              <Icon className='arrow-section' icon={`bi-chevron-down`} />
                            </label>
                          </div>

                          <div className='overflow-hidden'>
                            <ul id={currentId} className={`list-unstyled ps-${indent} ${shouldShowFirstLevelRoutes ? '' : ' nav-item-hidden'} my-1`}>
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
                          </div>

                        </li>
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
    </div>
  );
};

export default Menu;
