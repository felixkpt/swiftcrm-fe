import { createBrowserRouter } from 'react-router-dom';
import Login from '@/Pages/Auth/Login';
import Profile from '@/Pages/User/Profile';
import Register from '@/Pages/Auth/Register';
import Admin from '@/Pages/Admin/Index';
import TestErrorBoundary from '@/Pages/TestErrorBoundary';
import Test from '@/Pages/Admin/Test';
import GuestLayout from '@/Layouts/Guest/GuestLayout';
import AuthenticatedLayout from '@/Layouts/Authenicated/AuthenticatedLayout';
import ViewRole from '@/Pages/Admin/Settings/RolePermissions/ViewRole';
import Users from '../Pages/Admin/Settings/Users/Index';
import Roles from '@/Pages/Admin/Settings/RolePermissions/Roles/Roles';
import Permissions from '@/Pages/Admin/Settings/RolePermissions/Permissions/Permissions';
import CreateOrUpdatePermission from '@/Pages/Admin/Settings/RolePermissions/Permissions/CreateOrUpdatePermission';
import CreateOrUpdateUser from '@/Pages/Admin/Settings/Users/CreateOrUpdateUser';
import Index from '@/Pages/Admin/Settings/Users/User/Index';
import Error404 from '@/Pages/ErrorPages/Error404';

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
			{
				path: '*',
				element: <Error404 />,
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
				path: '/admin/settings/role-permissions/roles',
				element: <Roles />,
			},
			{
				path: '/admin/settings/role-permissions/permissions',
				element: <Permissions />,
			},
			{
				path: '/admin/settings/role-permissions/permissions/create',
				element: <CreateOrUpdatePermission />,
			},
			{
				path: '/admin/settings/role-permissions/permissions/permission/:id/edit',
				element: <CreateOrUpdatePermission />,
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
			{
				path: '/admin/settings/users/user/:id',
				element: <Index />,
			},
			
		],
	},
]);


export default router;
