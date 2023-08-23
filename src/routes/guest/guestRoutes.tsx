import Admin from '@/Pages/Admin/Index';
import Login from '@/Pages/Auth/Login';
import Register from '@/Pages/Auth/Register';
import Password from '@/Pages/Auth/Password';
import Error404 from '@/Pages/ErrorPages/Error404';
import PasswordSet from '@/Pages/Auth/PasswordSet';
import AuthenticatedLayout from '@/Layouts/Authenicated/AuthenticatedLayout';

const guestRoutes = [
    {
        path: '/',
        element: <AuthenticatedLayout uri='admin' permission={null} Component={Admin} />,
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
        path: '/password',
        element: <Password />,
    },
    {
        path: '/password-set/:token',
        element: <PasswordSet />,
    },
    {
        path: '*',
        element: <Error404 />,
    },
]

export default guestRoutes