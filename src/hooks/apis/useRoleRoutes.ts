import useAxios from '@/hooks/useAxios';
import { useEffect } from 'react';

const useRoleRoutes = (roleUri, routesUri) => {
  const { data: role, get: getRole } = useAxios();
  const { data: routes, get: getRoutes } = useAxios();

  useEffect(() => {
    if (roleUri) {
      getRole(roleUri);
     
    }
  }, [roleUri]);

  useEffect(() => {
    if (roleUri) {
      getRoutes(routesUri);
    }
  }, [roleUri]);

  return { role, routes };
};

export default useRoleRoutes;
