import React from 'react'
import { NavLink } from 'react-router-dom';

type Props = {}

const Error403 = (props: Props) => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="text-center mt-4">
                        <h1 className="display-1">403</h1>
                        <p className="lead">Forbidden</p>
                        <p>You do not have permission to access this page.</p>
                        <NavLink to="/">
                            Return to Dashboard
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Error403;
