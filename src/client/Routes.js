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
import App from './App';
import HomePage from './pages/HomePage';
/* import UsersListPage, { loadData } from './pages/UsersListPage'; */
import UsersListPage from './pages/UsersListPage';
import NotFoundPage from './pages/NotFoundPage';

// We always want this App component to be visible and we definitely want any
// other component that is going to be shown inside of our application to be
// rendered inside of the App.

export default [
  {
    ...App,
    // We did not tie a path to this App component. That means it will always
    // be displayed on the screen no matter what.

    // Last thing we have to do is, to make sure whenever we match one of these
    // child routes, they end up getting rendered by the App. So the App component
    // right there (i.e ...App), is going to be passed the child component
    // as a property and it's going to be up to the App component to figure out
    // that it needs to actually render whatever routes got matched as children.
    routes: [
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
      {
        // By not providing a path, React Router will decide to show this
        // component if it cannot match any of the other routes that are defined.
        ...NotFoundPage,
      },
    ],
  },
];
