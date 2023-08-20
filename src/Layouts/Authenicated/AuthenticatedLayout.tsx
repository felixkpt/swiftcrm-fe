import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar/Index';
import Footer from './Footer/Index';
import useAxios from '@/hooks/useAxios';
import SideNav from './SideNav/Index';
import ScrollToTop from '@/components/ScrollToTop';

const AuthenticatedLayout = () => {

    const { user, updateUser, deleteUser } = useAuth();
    const navigate = useNavigate();

    // Initialize useAxios with the desired endpoint for fetching user data
    const { data, loading, get } = useAxios();

    useEffect(() => {
        const fetchData = () => {
            get('/user?check=1');
        };
        fetchData();
    }, []);

    const [tried, setTried] = useState(false);

    useEffect(() => {
        if (tried === false && loading === true) setTried(true);

        if (loading === false && tried === true) {
            const user = data;
            if (user) {
                updateUser(user);
            } else {
                deleteUser()
                navigate('/login');
            }
        }
    }, [loading, tried]);

    useEffect(() => {
        const $button = document.querySelector('#sidebar-toggle');
        const $wrapper = document.querySelector('#wrapper');

        const handleSidebarToggle = (e: any) => {
            e.preventDefault();
            $wrapper?.classList.toggle('toggled');
        };

        $button?.addEventListener('click', handleSidebarToggle);

        return () => {
            $button?.removeEventListener('click', handleSidebarToggle);
        };
    }, []);

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
                            <main className='containter bg-body-secondary p-2'>
                                <Outlet />
                            </main>
                            <Footer />
                        </div>
                    </div>
                </>
            ) :
                <div>
                    {
                        loading ?
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
