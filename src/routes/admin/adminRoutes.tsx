
import Admin from '@/Pages/Admin/Index';
import settings from './settings';
import documentation from './documentation/documentation';
import tickets from './tickets/tickets';

const adminRoutes = [
  {
    path: '',
    element: <Admin />,
  },
  {
    path: 'settings',
    children: settings
  },
  {
    path: 'tickets',
    children: tickets
  },
  {
    path: 'documentation',
    children: documentation
  }
]

export default adminRoutes