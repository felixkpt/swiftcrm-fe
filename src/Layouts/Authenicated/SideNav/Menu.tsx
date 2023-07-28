import React, { useEffect, useState } from 'react';
import MenuRoutesTree from './MenuRoutesTree';
import useAxios from '@/hooks/useAxios';
import { useAuth } from '@/contexts/AuthContext';


const Menu = () => {

  const { data, get, loading } = useAxios()
  const { user } = useAuth()

  const [userMenu, setUserMenu] = useState(null)

  useEffect(() => {

    if (user && userMenu === null) {
      get('/admin/settings/role-permissions/permissions/user/' + user.id)
    }

  }, [user])

  useEffect(() => {

    if (!loading && data) {
      setUserMenu(data?.data)
    }

  }, [loading])

  return (
    <div>
      <h4>Menu</h4>
      {
        userMenu !== null ?
          <MenuRoutesTree routes={userMenu} handleSubmit={(checkboxStates) => console.log(checkboxStates)} />
          :
          <div className="d-flex align-items-center gap-3">
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Loading...
          </div>
      }
    </div>
  );
};

export default Menu;
