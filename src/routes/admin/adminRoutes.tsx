import Admin from '@/Pages/Admin/Index';
import settings from './settings';
import docs from './docs';
import tickets from './tickets/tickets';
import AuthenticatedLayout from '@/Layouts/Authenicated/AuthenticatedLayout';
import Error404 from '@/Pages/ErrorPages/Error404';


const adminRoutes = [
  {
    path: '',
    element: <AuthenticatedLayout uri='admin' permission={null} Component={Admin} />,
  },
  {
    path: 'settings',
    children: settings,
  },
  {
    path: 'tickets',
    children: tickets,
  },
  {
    path: 'docs',
    children: docs,
  },
  {
    path: '*',
    element: <AuthenticatedLayout uri='error-404' permission={null} Component={Error404} />,
  },
];

export default adminRoutes;
