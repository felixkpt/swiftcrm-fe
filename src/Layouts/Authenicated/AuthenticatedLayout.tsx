import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

import Navbar from './Navbar/Index';
import Footer from './Footer/Index';
import useAxios from '@/hooks/useAxios';
import SideNav from './SideNav/Index';
import ScrollToTop from '@/components/ScrollToTop';
import Error403 from '@/Pages/ErrorPages/Error403';
import usePermissions from '@/hooks/usePermissions';
import Loader from '@/components/Loader';
import { useRolePermissionsContext } from '@/contexts/RolePermissionsContext';
import Error404 from '@/Pages/ErrorPages/Error404';
import { environment } from '@/utils/helpers';

interface Props {
    uri: string
    permission?: string | null
    Component: React.ComponentType
}
const AuthenticatedLayout = ({ uri, permission, Component }: Props) => {

    const [reloadKey, setReloadKey] = useState<number>(0);

    const { user, updateUser, deleteUser, verified } = useAuth();
    const navigate = useNavigate();

    // Initialize useAxios with the desired endpoint for fetching user data
    const { data, loading: loadingUser, get } = useAxios();

    const { loadingRoutePermissions, fetchRolesAndDirectPermissions, fetchRoutePermissions, routePermissions } = useRolePermissionsContext();

    const { checkPermission } = usePermissions()

    const allowedRoutes = ['error-404']

    const [isAllowed, setIsAllowed] = useState(true)
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        // Prioritize permission is given (this refers to direct permission)
        const testPermission = permission || uri

        if (verified === true && testPermission && loadingRoutePermissions === false) {

            if (!allowedRoutes.includes(testPermission)) {
                const isAllowed = checkPermission(testPermission, 'get');
                // setIsAllowed(isAllowed);
            }

            setTimeout(function () {
                setChecked(true);
            }, 700);

        }

    }, [verified, loadingRoutePermissions, Component, permission, routePermissions])

    useEffect(() => {

        const fetchData = () => {
            get('/user?verify=1').then((res) => res && fetchRolesAndDirectPermissions());
        }

        if (verified === false)
            fetchData();

    }, [verified]);

    const [tried, setTried] = useState(false);

    useEffect(() => {
        if (tried === false && loadingUser === true) setTried(true);

        if (loadingUser === false && tried === true) {
            const user = data;
            if (user) {
                updateUser(user);
            } else {
                deleteUser()
                navigate('/login');
            }
        }
    }, [loadingUser, tried]);

    const [previousUrl, setPreviousUrl] = useState<string | null>(null)

    useEffect(() => {

        if (previousUrl !== location.pathname) {
            setPreviousUrl(location.pathname)
        }

    }, [location.pathname]);

    useEffect(() => {
        if (reloadKey > 0) {
            fetchRoutePermissions()
        }

    }, [reloadKey])

    return (
        <div key={reloadKey}>
            <ScrollToTop />
            {user ? (
                <>
                    <Navbar />
                    <div id="layoutSidenav">
                        <div id="layoutSidenav_nav">
                            <SideNav />
                        </div>
                        <div id="layoutSidenav_content">
                            <main className='container-fluid p-3 min-h-100vh position-relative'>
                                {
                                    isAllowed === true && checked === true ?
                                        <Component />
                                        :
                                        <>
                                            {
                                                loadingRoutePermissions === false && checked === true ? (
                                                    environment === 'local' ? <Error403 previousUrl={previousUrl} currentUrl={location.pathname} setReloadKey={setReloadKey} /> : <Error404 previousUrl={previousUrl} currentUrl={location.pathname} setReloadKey={setReloadKey} />
                                                ) : (
                                                    <Loader message='Granting you page access...' />
                                                )
                                            }
                                        </>
                                }
                            </main>
                            <Footer />
                        </div>
                    </div>
                </>
            ) :
                <div>
                    {
                        loadingUser ?
                            <div className="d-flex align-items-center gap-3">
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Please wait, logging you in...
                            </div>
                            :
                            <div className='alert alert-danger text-center'>Unknown server error occured.</div>
                    }
                </div>
            }
        </div>
    );
};

export default AuthenticatedLayout;
