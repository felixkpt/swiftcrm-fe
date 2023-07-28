import { useAuth } from "@/contexts/AuthContext";
import useAxios from "@/hooks/useAxios";
import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import defaultAvatar from '@/images/defaultavatar.png'
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


    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-secondary bg-dark">
                <div className="container-fluid">
                    <a href="#" className="navbar-brand" id="sidebar-toggle">X<i className="fa fa-bars"></i></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 profile-menu">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img className="useravatar" src={defaultAvatar} alt="" />
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="#"><i className="fas fa-sliders-h fa-fw"></i> Account</a></li>
                                    <li><a className="dropdown-item" href="#"><i className="fas fa-cog fa-fw"></i> Settings</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><span className="dropdown-item" onClick={handleLogout}><i className="fas fa-sign-out-alt fa-fw"></i> Log Out</span></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </div>
    );
};
export default NavBar