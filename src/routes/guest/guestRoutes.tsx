import Login from '@/Pages/Auth/Login';
import Register from '@/Pages/Auth/Register';
import Password from '@/Pages/Auth/Password';
import Error404 from '@/Pages/ErrorPages/Error404';
import PasswordSet from '@/Pages/Auth/PasswordSet';

const guestRoutes = [
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