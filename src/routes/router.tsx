import { createBrowserRouter } from 'react-router-dom';
import GuestLayout from '@/Layouts/Guest/GuestLayout';
import AuthenticatedLayout from '@/Layouts/Authenicated/AuthenticatedLayout';
import adminRoutes from '@/routes/admin/adminRoutes';
import guestRoutes from '@/routes/guest/guestRoutes';
import Profile from '@/Pages/User/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    children: guestRoutes,
  },
  {
    path: 'profile',
    element: <AuthenticatedLayout permission="access_profile" />,
    children: [
      {
        path: '',
        element: <Profile />,
      }
    ]
  },
  {
    path: 'admin',
    children: adminRoutes,
  },
]);


export default router;
