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
