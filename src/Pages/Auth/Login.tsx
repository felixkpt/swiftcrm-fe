import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import useAxios from '@/hooks/useAxios';
import ErrorBoundary from '@/components/Notifications/ErrorBoundary';

export default function Login() {
    const { user, setUser, csrfToken } = useAuth();
    const navigate = useNavigate();

    // Initialize useAxios with the desired endpoint for login
    const { data, loading, error, post } = useAxios();

    // login user
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = e.target.elements;
        const body = {
            email: email.value,
            password: password.value,
        };

        csrfToken();
        await post('/login', body);

    }

    const [tried, setTried] = useState(false);

    useEffect(() => {
        if (tried === false && loading === true) setTried(true);

        if (loading === false && tried === true) {
            const user = data;
            if (user) {

                setUser(user);
                // Redirect the user to the home page
                navigate('/admin');

            }
        }
    }, [loading, tried]);

    return (
        <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="card shadow">
                <div className="card-title text-center border-bottom">
                    <h2 className="p-3">Login</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-4">
                            <label htmlFor="email" className="form-label">Username/Email</label>
                            <input type="email" className="form-control" name='email' id="email" />
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" name='password' id="password" />
                        </div>
                        <div className="form-group mb-4">
                            <input type="checkbox" className="form-check-input" name="remember" id="remember" />
                            <label htmlFor="remember" className="form-label">Remember Me</label>
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary main-bg">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
