import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar/Index';
import Footer from './Footer/Index';
import useAxios from '@/hooks/useAxios';
import Sidebar from './SideNav/Index';
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
                <div id="wrapper">
                    <Sidebar />
                    <div id="navbar-wrapper">
                        <Navbar />
                    </div>
                    <main id="content-wrapper" className='w-100 min-h-100vh'>
                        <div className='containter bg-body-secondary p-2 min-h-100vh'>
                            <div className="row">
                                <div className="col-lg-12">
                                    <Outlet />
                                </div>
                            </div>
                        </div>
                    </main>
                    <Footer />

                </div>
            ) : (
                <div className="loading-message">Please wait, logging you in...</div>
            )}
        </>
    );
};

export default AuthenticatedLayout;
