import Admin from '@/Pages/Admin/Index';
import settings from './settings';
import documentation from './documentation';
import users from './users';
import tickets from './tickets/tickets';
import AuthenticatedLayout from '@/Layouts/Authenicated/AuthenticatedLayout';


const adminRoutes = [
  {
    path: '',
    element: <AuthenticatedLayout uri='admin' permission={null} Component={Admin}/>,
  },
  {
    path: 'settings',
    children: settings,
  },
  {
    path: 'users',
    children: users,
  },
  {
    path: 'tickets',
    children: tickets,
  },
  {
    path: 'documentation',
    children: documentation,
  },
];

export default adminRoutes;
