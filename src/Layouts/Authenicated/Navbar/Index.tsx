import { useAuth } from "@/contexts/AuthContext";
import useAxios from "@/hooks/useAxios";
import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import defaultAvatar from '@/images/defaultavatar.png'
import { Icon } from "@iconify/react/dist/iconify.js";
const NavBar = () => {
    const [open, setOpen] = React.useState(false);
    const [flyer, setFlyer] = React.useState(false);
    const [flyerTwo, setFlyerTwo] = React.useState(false);
    const { user } = useAuth();
    const { post, loading } = useAxios();

    // logout user
    const handleLogout = async (e: any) => {
        e.preventDefault();
        try {
            await post('/logout');
            localStorage.removeItem('user');
            window.location.href = '/';
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // Add event listener to all elements with the class 'dropdown-toggle'
        document.querySelectorAll('.dropdown-toggle').forEach(item => {
            item.addEventListener('click', event => {
                if (event.target.classList.contains('dropdown-toggle')) {
                    event.target.classList.toggle('toggle-change');
                } else if (event.target.parentElement.classList.contains('dropdown-toggle')) {
                    event.target.parentElement.classList.toggle('toggle-change');
                }
            });
        });

        // Clean up the event listener on component unmount
        return () => {
            document.querySelectorAll('.dropdown-toggle').forEach(item => {
                item.removeEventListener('click', event => {
                    // Your event listener logic here if needed
                });
            });
        };
    }, []);

    useEffect(() => {
        const sidebarToggle = document.body.querySelector('#sidebarToggle');

        const toggleSidebar = (event: Event) => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');

            const isToggled = document.body.classList.contains('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', isToggled.toString());
        };

        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', toggleSidebar);
        }

        return () => {
            if (sidebarToggle) {
                sidebarToggle.removeEventListener('click', toggleSidebar);
            }
        };
    }, []);


    return (
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <a className="navbar-brand ps-3" href="index.html">Start Bootstrap</a>
            <button className="btn btn-link btn-sm me-4 me-lg-0" id="sidebarToggle"><Icon icon={`fa6-solid:bars`} /></button>
            <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                <div className="input-group">
                    <input className="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                    <button className="btn btn-primary" id="btnNavbarSearch" type="button"><i className="fas fa-search"></i></button>
                </div>
            </form>
            <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><Icon icon={`uiw:user`} /></a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><NavLink className="dropdown-item" to="/user/profile">Profile</NavLink></li>
                        <li><a className="dropdown-item" href="#!">Activity Log</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" href="#!" onClick={handleLogout}>Logout</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
};
export default NavBar