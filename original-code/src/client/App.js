/* @ Root Component */

import React from 'react';
import { renderRoutes } from 'react-router-config';
import Header from './components/Header';
import { fetchCurrentUser } from './actions';

// We're going to call renderRoutes as a function and then into it, we're going
// to pass in any routes that get mactched during the match routes process, will
// be passed into the app component as a prop called `route`.
// So this route right here contains a property on it called `routes` and that is
// the collection of components that we need to render inside of the App.
// So now any child routes that are matched will be automatically turned into
// route components by this renderRoutes function call and basically everything
// shows up!
const App = ({ route }) => {
  return (
    <div>
      <Header />
      {renderRoutes(route.routes)}
    </div>
  );
};

// Now even though this is not strictly a page component per se, we're going to
// have it follow the same convention for exports as our page components because
// we might want to eventually tie some data loading to this App component.
// We would want to tie some data loading to this thing if there was some type
// of action creator or some type of request that we wanted to execute for
// every single page inside of our application, and we might eventually want to
// do that. So we're going to export this thing as though it were a page.
// Now we'll be able to use this thing with same spread syntax inside of our
// routes file!
export default {
  component: App,
  loadData: ({ dispatch }) => dispatch(fetchCurrentUser()),
};
