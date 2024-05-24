// This is a file that's going to be shared between both the client and the
// server side codebases.

/* @ Prevent naming collison for loadData fn for multiple pages */
// Approach:
// Rather than exporting the component and the load data function separately,
// we're going to export one single object from each page component file.
// And in that object we will wrap up both the component and the load data fn!
// We'll then use our ES2015 spread syntax to dump both the component and the
// load data definition into our route structure.

import React from 'react';
import HomePage from './pages/HomePage';
/* import UsersListPage, { loadData } from './pages/UsersListPage'; */
import UsersListPage from './pages/UsersListPage';

export default [
  {
    ...HomePage,
    path: '/',
    // component: HomePage,
    exact: true,
  },
  {
    ...UsersListPage,
    // loadData,
    path: '/users',
    // component: UsersListPage,
  },
];
