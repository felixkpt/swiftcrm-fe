import { createBrowserRouter } from 'react-router-dom';
import GuestLayout from '@/Layouts/Guest/GuestLayout';
import AuthenticatedLayout from '@/Layouts/Authenicated/AuthenticatedLayout';
import adminRoutes from '@/routes/admin/adminRoutes';
import guestRoutes from '@/routes/guest/guestRoutes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <GuestLayout />,
    children: guestRoutes,
  },
  {
    path: 'admin',
    element: <AuthenticatedLayout />,
    children: adminRoutes,
  },
]);


export default router;
