import React, { useEffect, useState } from 'react';
import MenuRoutesTree from './MenuRoutesTree';
import useAxios from '@/hooks/useAxios';
import { useAuth } from '@/contexts/AuthContext';
import Str from '@/utils/Str';
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';
import MenuTree from './MenuTree';
import RoutesList from './RoutesList';



function handleToggle(key: string) {
  const target = document.getElementById(key);
  target?.classList.toggle('d-none');
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
                        <li key={currentId} className='draggable' id={`${i}+${folder}`}>
                          <div className='toggler-section mb-2 px-1 bg-gradient rounded d-flex rounded-lg'>
                            <label className='toggler p-2 text-base d-flex align-items-center gap-1 justify-content-between flex-grow-1' onClick={() => handleToggle(currentId)}>
                              <span className='d-flex align-items-center gap-1'>
                                <Icon icon={`${icon || 'prime:bookmark'}`} />
                                <span>{Str.title(Str.afterLast(folder, '/'))}</span>
                              </span>
                              <Icon icon="bi-chevron-down" />
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
