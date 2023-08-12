import Login from '@/Pages/Auth/Login';
import Register from '@/Pages/Auth/Register';
import Error404 from '@/Pages/ErrorPages/Error404';

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
        path: '*',
        element: <Error404 />,
    },
]

export default guestRoutes