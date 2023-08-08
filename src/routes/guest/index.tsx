import Login from '@/Pages/Auth/Login';
import Register from '@/Pages/Auth/Register';
import Error404 from '@/Pages/ErrorPages/Error404';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

const index: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Error404 />} />
        </Routes>
    );
};

export default index;
