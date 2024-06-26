// This is going to end up as being the route or the entry point of our client
// side code base.

// @ Startup point for the client side application

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import axios from 'axios';
import Routes from './Routes';
import reducers from './reducers';

const axiosInstance = axios.create({
  baseURL: '/api',
});

// Now we have initial state from the server side redux state. So now this
// will create a store with some initial state and then pass it into the React
// app. So as soon as the UsersListPage component renders, it will reach into
// the store. It will see that there's already a list of users inside of there
// and it will attempt to render those onto the screen!
// That resolves that list item hydration error and also we no longer get a
// flash  of kind of empty page on the screen because the first time that
// React renders, it says, Oh hey, here's my list of users already in the
// Redux state. Fantastic. I'm just going to use these to render myself.
const store = createStore(
  reducers,
  window.INITIAL_STATE,
  applyMiddleware(thunk.withExtraArgument(axiosInstance)),
);

// Really important distinction here is that, When this code right here is
// executed on the browser side, there is already content inside of that div
// with id of `root`, all the content that we had already rendered into it
// from the server.
// So when we call ReactDOM.render(), we are not replacing all the HTML inside
// there. We are telling React to go back through and set up all those event
// handlers or all the necessary code that needs to be executed to kind of
// sort of bind to that existing structure that's on the page!

// This entire process of kind of putting functionality back into the DOM that
// was already rendered or all the HTML is already rendered, is reffered to as
// Hydration and if we look at that warning on the console, it actually makes
// mention of hydate. So the process of kind of rerendering over the once
// rendered HTML is reffered to as Hydration.
/* ReactDOM.render(<Home />, document.querySelector('#root')); */
// Resolve that warning with ReactDOM.hydate to rehydrate our application on the
// browser.
ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <div>{renderRoutes(Routes)}</div>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root'),
);
