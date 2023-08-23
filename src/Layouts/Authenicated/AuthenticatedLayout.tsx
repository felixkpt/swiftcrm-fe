import { ReactComponentElement, ReactNode, useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

import Navbar from './Navbar/Index';
import Footer from './Footer/Index';
import useAxios from '@/hooks/useAxios';
import SideNav from './SideNav/Index';
import ScrollToTop from '@/components/ScrollToTop';
import Error403 from '@/Pages/ErrorPages/Error403';
import usePermissions from '@/hooks/usePermissions';
import Loader from '@/components/Loader';
import { useRolePermissionsContext } from '@/contexts/RolePermissionsContext';

interface Props {
    uri: string
    permission: string
    Component: React.ComponentType
}
const AuthenticatedLayout = ({ uri, permission, Component }: Props) => {

    const { loadingRoutePermissions, fetchRolesAndDirectPermissions } = useRolePermissionsContext();

    useEffect(() => {
        fetchRolesAndDirectPermissions()
    }, [])

    const { checkPermission } = usePermissions()

    const [isAllowed, setIsAllowed] = useState(true)

    useEffect(() => {
        // Prioritize permission is given (this refers to direct permission)
        const testPermission = permission || uri

        if (testPermission && loadingRoutePermissions === false) {
            const isAllowed = checkPermission(testPermission, 'get');
            setIsAllowed(isAllowed);
        }

    }, [uri, permission, loadingRoutePermissions])

    const { user, updateUser, deleteUser } = useAuth();
    const navigate = useNavigate();

    // Initialize useAxios with the desired endpoint for fetching user data
    const { data, loading: loadingUser, get } = useAxios();

    useEffect(() => {
        const fetchData = () => {
            get('/user?check=1');
        };
        fetchData();
    }, []);

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

    return (
        <>
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
                                <div className={`${isAllowed === false ? 'position-absolute top-50 start-50 translate-middle w-100' : ''} `}>
                                    {isAllowed === true ? (
                                        <Component />
                                    ) : loadingRoutePermissions === false ? (
                                        <Error403 />
                                    ) : (
                                        <Loader message='Granting you page access...' />
                                    )}
                                </div>
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
                            <div className='alert alert-danger'>Server error</div>
                    }
                </div>
            }
        </>
    );
};

export default AuthenticatedLayout;
