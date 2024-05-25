// This file is going to house a function that will simply render our React
// app and return it as a string

import React from 'react';
import { renderToString } from 'react-dom/server';
// No need to import Home component because Home Component is rendered by the
// Routes Component
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import Routes from '../client/Routes';

export default (req, store) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={{}}>
        <div>{renderRoutes(Routes)}</div>
      </StaticRouter>
    </Provider>,
  );

  return `
    <html>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
      </head>
      <body>
        <div id='root'>${content}</div>
        <script>
          window.INITIAL_STATE = ${serialize(store.getState())}
        </script>
        <script src='bundle.js'></script>
      </body>
    </html>
  `;
};

/* Figure out what sets of components to show/render based on URL without
 * rendering the application!
 * Resolution is to use the `react-router-config` lib for SSR!
 * But once we start using `react router config` library, routes must be
 * configured to be an array of objects where each object represents one route
 * instead of classic JSX configuration!
 * And we need to make sure that wherever we were using that routes component
 * in the past, we replace all those places with this new renderRoutes fn
 * from the `react router config` library.
 */

// Routes here is an array of JavaScript objects. We're gonna pass that into
// the renderRoutes function. We can kind of imagine that renderRoutes right
// here takes an array of route objects, turns them into normal route components
// and then returns those.
// So at the end of the day, right now when we actually render our application,
// we still end up with some route components that we're very much used to
// working with in general, but they're being produced for us automatically
// by this renderRoutes function!

/* @ Dump state to Templates */
// By the time the store gets shoved into this function right here, it has all
// of this initial state inside of it. So we've already called all of those
// load data functions. We've already processed all the actions resulting
// from that, and we've taken all that state and put it into the store.
// So we can think of this `store` right here i.e (req, store), as kind of
// like an encyclopedia full of information.
//
// So what we're gonna do is, we're gonna add a second script tag to our HTML
// document right here. This is going to be a script tag that is not going to
// attempt to load up a JavaScript file from the server like `src='bundle.js'`.
// Instead, it's going to put down some literal JavaScript code directly into
// our template where we're going to write some raw JavaScript where we get
// all the state out of our store and then turn that into JSON data so that it
// can be safely printed our there or essentially injected into the string.
// If we attempt to just call ${store.getState()} and then put that into the
// string,, we would end up with this classic looking JavaScript error:
// ie. [Object object]
// So we have to turn this into JSON first before we put it into the string
// with JSON.stringify()
// i.e. window.INITIAL_STATE = ${JSON.stringify(store.getState())}
// That's pretty much it!
//
// So now all we have to do on the Client Side is locate our Client Side,
// createStore function and pass in this window.INITIAL_STATE as the initial
// state object, or in other words, the second argument to the createStore()
// function!

/* @ Mitigate XSS Attacks */
// But doing this: window.INITIAL_STATE = ${JSON.stringify(store.getState())}
// directly into our template is actually vulnerable to a little security flaw.
/* https://react-ssr-api.herokuapp.com/users/xss */
// By default, React protects against XSS attacks, but only on content that it,
// specifically React renders!
// So whenever we take our state out of our Redux store and try to dump it
// directly into our HTML template, we need to be very aware of attacks like
// this because they are just trivially easy for hackers to execute.
//
//
// Resolution to XSS:
// Here, we're currently dumping all of our state out into the HTML template.
// i.e. window.INITIAL_STATE = ${JSON.stringify(store.getState())}
// Now what we really have to do is kind of scrub the state right here.
// We've to go through all the data that is begin, that is contained within
// our Redux store and take care of any malicious code that is inside of there.
// So there's really not a lot that we can do against, say, trying to keep our
// API from getting bad data inside of it.
// We should always just assume that somehow bad data might end up inside of
// our application. So rather than trying to war against the API side, we're
// going to make sure that whatever data we dump into our template i.e store.getState(),
// is not going to accidentally be executed.
// SO to take care of this, we're going to import a library called
// JavaScript Serialize.
// Serialize right here is a function that takes a string and will essentially
// escape any charactes in there that are involved with setting up script tags,
// for example, the actual less than sign and greter than sign of the script tag
// like that.
// We replace JSON.stringify() with serialize()
// i.e ${serialize(store.getState())}
// THat will process it and we no longer have something like alert like that.
// <script> tag will no longer be executed by the browser.
// So essentially what this Serialize tool does is it takes any special characters
// like those < or > signs and it replaces them with their Unicode equivalents.
// So we convert all those bad tokens into the Unicode equivalents so that the
// browser inside the script tag will not attempt to execute those code.
// But when the browser attempts to actually render that token right there out
// on the page, it will convert it back to ASCII or something like visually
// equivalent for whatever the unicode character is!

/* @ Authentication */
/* @ Current authentication situation! */
// Authentication process is a contract between the API server and the browser
// that is held via cookies, jwt. Cookies in our case!
// All cookies in the browser corresponds to the server at the domain, subdomain
// and port that issued them.
// In another words, when we get a cookie set from our API at say `api.app.com`,
// when we make a request over to `www.app.com`, the cookie that had been
// assigned from `api.app.com` is not sent along to `www.app.com`.
// So as soon as we start accessing different domains, subdomains or ports,
// those cookies are not automatically included in the request.
// So in other words, if we make a request off to the API server and we get
// our identifying token, we get our cookie,
// a follow up request made to render server over here is not going to include
// the cookies. So this render server cannot somehow take the cookie from
// that request and make an authenticated request ocer to the API.
//
// So, We can definitely get a cookie assigned to the users browser from the API
// by going through the usual authentication flow. But we don't have a great way
// of somehow sharing that cookie with the render server.
// Now this is a big issues because at some point in time we're going to want the
// render server to be able to make an authenticated request over to the API.
//
// @ Solution
// @ Authentication via Proxy
// So to solve this, we're going to use a little bit of trickery.
// We're going to set up a proxy directly on our render server. We are going
// to make sure that whenever a user attempts to authenticate with our app,
// rather than sending the user's browser directly over to the API, we will
// instead send the user to the proxy running on our render server.
// The proxy will then forward that request for authentication onto the API.
// After a cookie is issued by the API, the proxy will then communicate that
// cookie back to the browser. So as far as the browser is concerned, the API
// server does not exist. The browser is going to think that it's just communicating
// with our render server. But unbeknownst to the browser, the browser has a
// proxy that is invisibly sending the requests out to the API server. The result
// is that the browser is going to think that this authentication cookie that it
// gets back is being issued by the render server, not by the API. So any follow
// up requests beging made to the render server will include that orignal
// authentication cookie that had been issued by the API.
// Then the render server will make all the needed requests to the API and
// manually attach the cookie onto that request to prove that the user is
// authenticated.
//
// Phase I: Initial page load phase!
// The thing to keep in mind is that during the initial page load period, the
// server is going to make attempt to some request to our API on behalf of the
// browser. So during the initial page load phase, the server needs to have
// access to some cookie that proves that the original user from the browser
// is logged in, so the proxy will not be active during this phase. There is
// nothing to proxy. The server is going to make requests on behalf of the browser,
// so we're going to have to somehow manually attach the cookie that got sent
// from the original page load request (i.e from browser) to this follow up
// request or this or this request over to the API over API Server so we can
// kind of imagine that this cookie (browser) gets attached right to this
// request over to the API.
//
// Phase II: Follow up request phase
// So after that initial page load, any follow up request are going to be issued
// directly from the browser. So this would be like some follow up AJAX request
// that is being ussued by our React application. So this is where the proxy is
// going to start to come into play. During this phase, the server will no longer
// touch or modify incoming requests. It will simply pass requests on to the API
// through the use of this proxy.
// Now these two different phases are going to result in some pretty interesting
// code. So we have to write code to make sure that during the initial page load
// request phase, we attempt to make request to the API directly because they are
// coming from the server. But then after that we're going to make sure that
// all the requests that are being made from our application are going to be
// passing through our server, through the proxy onto the API Server.

// @ Using JSON Web Tokens wouldn't work out too well here!
// This entire authenticaion scheme hinges upon a cookie, and the fact that
// cookies are issued on a per domain basis makes it seem like maybe using
// a cookie isn't really the best solution.
// So why don't we use a JSON Web Token (JWT) instead which doesn't follow
// these same restrictions? We could manually attach a JSON web token to
// every request like inside the header or the body or the URL, and that would
// authenticate us with the API with no issue.
// So why we aren't using JSON Web Token here?
// So there's an abundantly straightforward and very clear reason that we are
// using cookies rather than attempting to attach a JSON web token to all these
// requests in the URL or the header or the body.
//
// So first, here is how an approach with JSON Web Tokens without cookies would
// work!
// Cookies and JSON Web Tokens are not like specifically exclusive. We can use
// them together, we can take a JSON web token and put it into a cookie.
// Using a JSON web token that is appended to the header, the URL or the body
// of some data fetching request.
// Let's imagine for a second that we are in our browser already on some page
// and our Redux app decides that it needs to retrieve some data from like, say,
// the user's endpoint right here i.e /users.
// So to do this with JSON Web tokens, our Redux app would initiate a request
// to this endpoint and attach the JSON web token to the URL, the body of the
// request or header, one of those three. The JSON web token wold be communicated
// to the server and then some magic authentication process would happen.
// So the key thing here is to just keep in mind that communicating the JSON
// web token to the server is not automatic.
// When we want to use JSON web tokens outside of a cookie, we have to manually
// attach that to the header, body or URL of the request. So with all that in
// mind, let's think very carefully about what would happen during the
// Server Side Rendering process if we are using a JSON web token.
// The whole goal of Server Side Rendering is, we want to make sure that whenever
// a user enters a URL into their address bar, presses enter, they immediately
// get back some rendered content on the screen. That is the expectation with
// Server Side Rendering. But that is not possible if we are trying to access
// some protected route with a JSON web token authenticatoin scheme where the
// token needs to be attached to the URL, the header or whatever.
// That's the expectations.
// So here's the reality! Because the JSON web token has to be manually attached
// to any request, in order to show a proteced page, we would need a scheme like
// when a user enters our URL into the address bar and presses enter, the browser
// makes a get request to that domain and absolutely no information is included
// along with the request except for typical cookies, headers and what not.
// So we would see that incoming request and the JSON web token would not be
// present on the incoming request because it does not get automatically attached
// to the header, the URL or the body of the request. And we don't even get request
// bodies with get requests.
// So in other words, once we got that initial request to our server, we would
// have to turn around and say back to the browser, Hey, what's your JSON web
// token? You're trying to access some authenticated route. We need a token here
// on the server.
// So the whole key here is that we would have to make this follow up request,
// send back, hey, give us your JSON web token. The browser would respond with
// it and then we could finally send back some content. And so the reality of
// this whole situation is that we would no longer be able to send back rendered
// HTML content as a response to that initial request.
// If we were using a JSON web token, we would instead have to do some follow up
// request to the browser or from the browser to the server that incudes the
// JSON web token. And this is all because when a user enters the URL of our
// page into the address bar and hit enter, we have absolutely zero control
// over sending along some information with that request. The only thing we can
// count on being sent to that domain is the cookies that are tied to that domain.
// So the cookies always will be attached automatically to the request.
// And so that's why we are using a cookie based authentication flow here!!!
//
// So this is really a huge ussue around Server Side Rendering and we will see
// people in the community try to struggle with this or come up with some clever
// solution on manually attaching JSON web tokens for inside of Server Side
// Rendering applications. But at the end of the day, if we want to use
// authentication in a Server Side Renderd app, it really has to be cookie based
// so that the auth details can be included in the initial request made to our
// server!

// We're now ready to set up a proxy to handle some of our authentication issues
// between our browser, the render server and the API.
// @ Blueprints of what we're going to do here!
// So the first thing, we're going to attempt is to set up the actual proxy itself.
// It's just a couple of lines of code to somehow proxy requests that are being
// made from the browser to the render server off to the API.
// The second and the third parts, however, are going to be a little bit more
// challenging.
// STEPS 2 and 3:
// The entire point of Server Side Rendering (SSR) or even calling this application
// a Universal app or Isomorphic app is to make sure that we are writing the
// exact same code that gets executed on the server and the browser!
// So step number two in this process is going to be to make sure that any API
// requests or in other words, any action creators that we call while rendering
// our application on the server will be sent off directly to out API.
// Step number three is going to be to make sure that those exact same action
// creators that are now being called later on from the browser will be sent to
//  the proxy and then to the API server.
//  So the whole key here is to remember that we are talking about action
//  creators to make these requests and we want to call the exact same action
//  creator on both the render server during the initial page load attempt
//  and the browser during any follow up requests for data. So it's going to
//  be the exact same action creator that needs to behave somewhat differently.
//  One is going to be directly sending requests to the API server, the other is
//  going to be sending requests to the proxy and then on to the API server.

/* @ Renderer to API Communcation */
// Server is making requests means Axios library inside of the fetchUsers
// action creator making a request to our API.
//
// Approach:
// So during the initial page load, we need to make sure that Axios inside the
// fetchUsers action creator while it's running on the render server is going
// to make a request to this URL:
// await axios.get('react-ssr-api.herokuapp.com/users')
//
// Now after the initial page load process, in other words follow up requests
// made from the browser, the exact same action creator is now going to be
// running on the browser.
// i.e We've got the exact same action creator, the exact same Axios library
// but it suddenly needs to make a request to a different endpoint, a different
// URL, and it's going to behave entirely differently because now we don't
// have to worry about manually attaching any cookie in request. The browser is
// just going to take care of that for us.
// await axios.get('/api/users', { cookie: cookie!!! })
//
// Conclusion:
// So what we really want is, we want our action creator and more specifically
// axios, we want axios to behave slightly differently depending on whether it's
// running on the client or on the server.

// @ Pseudo code for the above approach (Renderer to API Communication)
/*
if ('we are running on server') {
  // Use axios to make request to this URL
  const res = await axios.get('react-ssr-api.herokuapp.com/users');
} else {
  // Make a request with axios to this URL and send along the cookie
  const res = await axios.get('/api/users', { cookie: cookie!!! })
}
*/

/* @ Axios Instances with Redux Thunk
 * We need to somehow customize the configuratoin of Axios depending on whether
 * we are running it on the client or the server.
 * We dont't really want to put that customization into every single action
 * creator.
 * So for that, we're going to use a very little documented feature of Axios
 * and Redux thunk to solve this in a much more concise fashion!
 *
 * Creating an axios instance from the official documentation:
 * ```js
 * var instance = axios.create({
 *    baseURL: 'https://some-domain.com/api/',
 *    timeout: 1000,
 *    headers: {'X-Custom-Header': 'foobar'}
 * })
 * ```
 *
 * We might want to make some base URL one for the server and then one for the
 * client.
 * On the official source code of Redux Thunk in src/index.js, there's an
 * extra function attached to the exported thunk called withExtraArgument.
 *
 * i.e
 * ```js
 * functoin createThunkMiddleware(extraArgument) {
 *    return ({ dispatch, getState}) => next => action => {
 *      if (typeof action === 'function') {
 *        return action(dispatch, getState, extraArgument);
 *      }
 *
 *      return next(action);
 *    }
 * }
 *
 * const thunk = createThunkMiddleware();
 * thunk.withExtraArgument - createThunkMiddleware;
 *
 * export default thunk;
 * ```
 *
 * So with this extra argument thing right here is essentially a function
 * that allows us to create kind of a custom copy of Redux Thunk that takes
 * some extra argument. And then whenever Redux Thunk calls one of our function
 * action creators, like the function that we return from a Redux thunkified
 * action creatorm it will not only pass in the dispatch function, it will not
 * only pass in the getState function, which is a reference to our Redux Store's
 * getState function, but it will also pass in third arguemnt this extraArgument
 * thing.
 *
 * So putting together, with Axios we can create a custom configuration here and
 * with Redux Thunk we can somehow kind of like inject a custom extra third
 * argument (extraArgument) to our action creators!!
 *
 * So now on both the client and the server, we're going to use these two
 * features together to easily address the fact that we want to have a custom
 * Axios instance on the client and a custom Axios instance on the server.
 * i.e In our application right now, we've two different copies of Redux store
 * floating around. We've got the one on the client and one on the server.
 * We're going to make sure that when we create each of these copies, we also
 * create a custom instance of Axios and pass that custom instnace into Redux
 * Thunk as an extra third argument. Then in our actoin creators, whenever we
 * try to make some type of network request, we will receive that customized
 * copy of Axios rather than import the axios module itself.
 * We can then freely make requests in our action creator without having to
 * actually worry about whether we are on the client or the server.
 *
 * So in othe rwords, we're doing this early customization of Axios slightly
 * different on the client, slightly different on the server.
 * We then pass that as the third argument or as an argument to Redux Thunk,
 * and then we've got that customized instance of Axios available in our
 * action creators. So we will be able to make requests just like we normally
 * would. Anyways from our action creators but it will be on a preconfigured
 * Axios instance, so don't have to worry about changing the URL or attaching
 * cookies or any of that crazy stuff.
 * */

/*
export default (req, store) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={{}}>
        <div>{renderRoutes(Routes)}</div>
      </StaticRouter>
    </Provider>,
  );

  return `
    <html>
      <head></head>
      <body>
        <div id='root'>${content}</div>
        <script>
          window.INITIAL_STATE = ${serialize(store.getState())}
        </script>
        <script src='bundle.js'></script>
      </body>
    </html>
  `;
};
*/
