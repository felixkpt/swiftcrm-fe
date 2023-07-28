import { createBrowserRouter, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Login from '@/Pages/Auth/Login';
import Profile from '@/Pages/User/Profile';
import Register from '@/Pages/Auth/Register';
import Admin from '@/Pages/Admin/Index';
import RolePermissions from '@/Pages/Admin/Settings/RolePermissions/Index';
import TestErrorBoundary from '@/Pages/TestErrorBoundary';
import Test from '@/Pages/Admin/Test';
import GuestLayout from '@/Layouts/Guest/GuestLayout';
import AuthenticatedLayout from '@/Layouts/Authenicated/AuthenticatedLayout';
import ViewRole from '@/Pages/Admin/Settings/RolePermissions/ViewRole';
import Users from '../Pages/Admin/Settings/Users/Index';
import CreateOrUpdateUser from '@/Pages/Admin/Settings/Users/CreateOrUpdateUser';

const router = createBrowserRouter([
	{
		path: '/',
		element: <GuestLayout />,
		children: [
			{
				path: '/',
				element: <Login />, // Redirect root to /admin
			},
			{
				path: '/login',
				element: <Login />,
			},
			{
				path: '/register',
				element: <Register />,
			},
			{
				path: '/testerrorboundary',
				element: <TestErrorBoundary />,
			},
			{
				path: '/test',
				element: <Test />,
			},
		],
	},
	{
		path: '/',
		element: <AuthenticatedLayout />,
		children: [
			{
				path: '/admin',
				element: <Admin />,
			},
			{
				path: '/user/profile',
				element: <Profile />,
			},
			{
				path: '/admin/settings/role-permissions/:tab',
				element: <RolePermissions />,
			},
			{
				path: '/admin/settings/role-permissions/roles/:id',
				element: <ViewRole />,
			},
			{
				path: '/admin/settings/users',
				element: <Users />,
			},
			{
				path: '/admin/settings/users/create',
				element: <CreateOrUpdateUser />,
			},
			{
				path: '/admin/settings/users/user/:id/edit',
				element: <CreateOrUpdateUser />,
			},
		],
	},
]);

export default router;
