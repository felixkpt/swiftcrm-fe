import React from 'react';
import { Redirect } from 'react-router-dom';
import Admin from '@/Pages/Admin/Index';
import settings from './settings';
import documentation from './documentation/documentation';
import users from './users';
import tickets from './tickets/tickets';
import Error403 from '@/Pages/ErrorPages/Error403';
import { userCanView } from '@/utils/helpers';

// Function to conditionally render a component or redirect to 403
const renderComponentOr403 = (view, Component) => {
  return userCanView(view) ? <Component /> : <Error403 />;
};

const adminRoutes = [
  {
    path: '',
    element: renderComponentOr403('admin', Admin),
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
