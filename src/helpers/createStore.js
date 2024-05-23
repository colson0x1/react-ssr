/* @ Redux on SSR
 * Redux needs to be different configuration on Browser vs Server:
 * We're going to create two different stores. And we're going to have one
 * store for the browser bundle and one store for the server bundle.
 */

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../client/reducers';

// We're not importing Provider here like on client.js and that's because the
// soul purpose of this file right now is to create the Redux store whereas
// inside the client.js file, we want it to both create the Redux store and
// then immediately use it inside the React application.

// The Redux store on this Server is going to behave slightly different than
// it does on the client.
// One of the big drivers behind this is the fact that we have this big challenge
// here where we need to do some detection of when we finish all of our initial
// data loading (i.e detect when all initial data load action creators are completed
// on server) before we attempt to actually render our application.
// And so a lot of the running theme around creating this Redux Store on the
// Server is going to be all about creating the store and working with it in some
// fashion before we ever attempt to render our application inside the renderer.
// And so that's why we are not tying the store creation on the server very
// closely to that Provider tag, because as soon as we make that Provider tag,
// it really indicates that we are trying to or attempting to render our
// application.
// So in other words, we're just creating the store inside of here and that's it!

export default () => {
  const store = createStore(reducers, {}, applyMiddleware(thunk));

  return store;
};
