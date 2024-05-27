/* @ Redux on SSR
 * Redux needs to be different configuration on Browser vs Server:
 * We're going to create two different stores. And we're going to have one
 * store for the browser bundle and one store for the server bundle.
 */

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import reducers from '../client/reducers';

export default (req) => {
  const axiosInstance = axios.create({
    // Because we are making a request on the server, we need the fully qualified
    // URL to get access to our API at Heroku app
    // We do not have the benefit of any proxy here. There is no proxy that's going
    // to somehow take the request that is being issued on the server and send
    // it on to Heroku app for us.
    // So in this case our baseURL is going to be the full http:// ...
    baseURL: 'http://react-ssr-api.herokuapp.com',
    // So on this case, on the server with this Axios instance, we not only
    // want to specify the base URL, but we also want to attach the cookie
    // from the incoming request from the user's browser as well.
    // So to do that, we're going to go back to catch all routes in index.js
    // file and we're going to make sure that whenever we create our new store,
    // we also pass in the original request that is coming from the user's browser.
    // That req object right there has a tremendous amont of data nd it also
    // includes within it all the cookies that were sent from the user's browser
    // to this route handler or to our render server. So we're going to take this
    // request object and we're gona pass it into the createStore function there!
    // We'll receive that req object here and then we're going to add on to our
    // Axios instance configuration right here, a custom header!!
    // Here we are also setting an fall back of empty string because sometimes
    // users will be making requests to our server without any cookie being set
    // here i.e on req.get('cookie').
    // So in that case, defaulting the value to be empty string prevents the
    // header of undefined right here because if we have undefined, the request
    // is going to crash.
    headers: { cookie: req.get('cookie') || '' },
  });

  // So now whenever that above Axios instance is used to make requests to the
  // API, the API is going to be absolutely tricked into thinking that the
  // request is coming from a real user.
  // So now the last thing we have to do is take that `axiosInstance` and
  // get it to show up inside of our action creator, just like how we did
  // on the client side.
  const store = createStore(
    reducers,
    {},
    applyMiddleware(thunk.withExtraArgument(axiosInstance)),
  );

  return store;
};

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

/* @ Client State Rehydration
 * The current state of client side React App is, clearing out the page
 * temporarily because none of our server side state from the Redux store is
 * being communicated down to the browser.
 * That is why we see, user's list after 2 seconds on the browser!
 *
 * We want to make sure that when we send down our application from the server
 * to the browser, when the React application rehydrates on the client side or
 * on the browser side, it doesn't think oh hey there's some content that
 * shouldn't be here, we want to somehow preserve the state that we've
 * prefetched from the server and somehow communicate the state down to
 * the browser.
 *
 * Solution:
 * We're going to add two additional steps into our Server Side Rendering flow.
 * As we render the HTML document on our server, we're going to simultaneously
 * take all of our state in our Redux store. So all the state that we've shoved
 * in there from all those load data functions and we're going to take that state
 * and dump it as JSON data into our HTML template.
 * So the HTML document will not only contain all of our pages HTML, but it will
 * also contain the raw data that was used to render it from our Redux Store.
 * Then we send the HTML document down to the browser. We send the client
 * bundle.js file, React starts up, Redux starts up. And then here's the important
 * part, the client side store, when we initialize it, we're going to take all
 * that JSON data that we dumped into our HTML template and we're going to pass
 * it into the client side, create store function as the second argument, So
 * when our Redux app boots up on the client side, it'll have an initial state
 * state as that is the exact same as what was used to render the page on the
 * sever.
 * And so in theory, once the React app renders that first time on the browser,
 * it should be using the exact same data to render the application as was used
 * on the server. And so when it renders on the browser, the React app will
 * render, it will realize, okay, I'm going to render the UsersList Component,
 * it's going to pull the list of users out of the store and that list of users
 * will result in this list of <li>'s right there with data.
 * And so we should no longer see this warning message down there on the browser:
 * @ Warning: Did not expect server HTML to contain a <li> in <ul>.
 * So we should be no longer seeing that warning message because that initial
 * hydration step on the browser will be using the exact same data or the exact
 * same list of users. And so the React app will think that, yep, there definitely
 * should be a list of <li>'s inside this URL i.e localhost:3000/users
 *
 * So that's pretty much the solution!!
 * We're going to take all of our state ouf of the Redux Store, dump it into
 * the HTML template, and then use that to initialize our store on the client
 * side!!!
 * */
/*
export default () => {
  const store = createStore(reducers, {}, applyMiddleware(thunk));

  return store;
};
*/
