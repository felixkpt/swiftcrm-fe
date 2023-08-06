import React, { useEffect, useState } from 'react';
import MenuRoutesTree from './MenuRoutesTree';
import useAxios from '@/hooks/useAxios';
import { useAuth } from '@/contexts/AuthContext';


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
            <MenuRoutesTree routes={userMenu} />
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
