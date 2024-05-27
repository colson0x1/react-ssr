// This is a file that's going to be shared between both the client and the
// server side codebases.

import React from 'react';
import App from './App';
import HomePage from './pages/HomePage';
/* import UsersListPage, { loadData } from './pages/UsersListPage'; */
import UsersListPage from './pages/UsersListPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminsListPage from './pages/AdminsListPage';

export default [
  {
    ...App,
    routes: [
      {
        ...HomePage,
        path: '/',
        exact: true,
      },
      {
        ...AdminsListPage,
        path: '/admins',
      },
      {
        ...UsersListPage,
        path: '/users',
      },
      {
        ...NotFoundPage,
      },
    ],
  },
];
