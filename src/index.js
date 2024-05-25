import 'babel-polyfill';
import express from 'express';
import { matchRoutes } from 'react-router-config';
import proxy from 'express-http-proxy';
import Routes from './client/Routes';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';

// @ React Router DOM
// Server - StaticRouter
// -> For use when doing SSR
// Client - BrowserRouter
// -> For use when running in a browser

const app = express();

// Send request from any request that is coming in to the root /api
// So in other words, if the browser ever makes a request to our render server
// with a route that begins with slash API i.e /api, we will attempt to proxy
// it off or send it off to the proxy server.
// And then we'll pass second argument of exactly what we want to have happen to
// this request.
// So we'll pass in proxy. Proxy is a function. We're going to pass it a string
// that tells it where to send this request to.
// So now any route whatsoever or any request whatsoever that tries to access
// a route of slash api will be automatically sent off to this domain here.
// The second option to the proxy function is just for this specific API setup
// to make our lives a little bit easier. Specifically it's around the OAuth
// process with Google and making sure that we don't run into some security
// errors with the Google OAuth flow. That's all.
app.use(
  '/api',
  proxy('http://react-ssr-api.herokuapp.com', {
    proxyReqOptDecorator(opts) {
      opts.headers['x-forwarded-host'] = 'localhost:3000';
      return opts;
    },
  }),
);

// @ Uncaught ReferenceError: regeneratorRuntime is not defined!
// That error message is due to our use of the async await syntax on
// client/actions/index.js
// By default, whenever we use the async await syntax, Babel assumes that
// there is something called a regenerator runtime defined inside of our
// working environment.
// And so essentially Babel is complaining because we didn't set up everything
// correctly.
// So a resolution to that is importing Babel Polyfill. It's going to actually
// execute that module, which is going to run through and polyfill or essentially
// define some of these helper functions that Babel wants to use for doing things
// like making use of the async await syntax.
// So we need to do this import not only inside of our server side bundle, but
// also inside the client side as well.

// This tells express that it needs to treat that public directory as a static
// or public directory that is available to the outside world.
app.use(express.static('public'));

// Now whenever a request comes in, we call the render function. AND then
// we attempt to render our Home Component to a string, stick it into our
// HTML template and then return the entire thing.
// And the result all gets sent back to whoever made this initial request here.

/* @ Handle all Routes */
// Tell Express to watch absolutely any routes inside of our application
// And if any requests comes in regardless of what route its looking for, we're
// just going to pass it off to React Router and allow React Router to
// deal with it
// So now no matter what, Express is always going to pass incoming request
// to our renderer which is going to pass the request on to React Router and
// allow that to decide what to do with it
app.get('*', (req, res) => {
  const store = createStore(req);

  // Some logic to initialize and load data into the store:
  // Take the current incoming request path, or in other words, the page that
  // the user is trying to fetch and look at our route configuration object and
  // decide what set of components need to be rendered.
  // `matchRoutes` takes two arguments. The first is the list of routes or the
  // route configuration array. And then the second argument is the path that
  // the user is attempting to fetch or attempting to view which is available
  // to us as `req.path`!
  // Now matchRoutes is going to look at this list of routes right here. It's
  // going to look at whatever route the user is trying to visit and then it's
  // going to return an array of components that are about to be rendered.
  // Here log is on the server terminal
  /* console.log(matchRoutes(Routes, req.path)); */

  // So this entire statement right here will return an array of promises
  // representing all the pending network requests from all the action
  // creators that we might end up calling.
  const promises = matchRoutes(Routes, req.path).map(({ route }) => {
    // Now all of our loadData functions will have a reference to our server
    // side redux store
    return route.loadData ? route.loadData(store) : null;
  });

  // @ UnhandledPromiseRejectionWarning
  // @ Rejection: Request failed with status code 401
  // We get that error when we disable JavaScript and access the protected
  // /admins route on the browser.
  // The reason is how `Promise.all` works:
  // If one thing goes wrong out of one dozen different requests or one dozen
  // promises, then Promise.all() no longer calls the .then() statement.
  // Instead it calls on or it calls a .catch() function instead.
  // And as of now, we don't have .catch() statement chained to this Promise.all
  // fn.
  // So in other words, we have one request in this array of promises that is
  // failing. The Promise.all statement says, okay, hey, something just went
  // completely wrong. We need to start to execute some error handling code, but
  // we don't have a `catch` statement chained on here, which is why we also
  // start to see that other warning message here:
  // Something it say, This is an unhandled promise rejection.
  // In other words, we did not successfully or in any way, shape or form handle
  // that failed request.
  // And so that is why our request to our server, like the actual page loading
  // request, just seems to hang because we kind of exit out of the optimal flow
  // or the kind of critical path here and we never actually attempt to render
  // the page and we never actually send any content back to the user.

  // Approach I: Add on a simple catch statement.
  // This is not a thing that I recommend but we're going to see this
  // approach in a lot of server side rendering boilerplates out there.
  // So a lot of other boilerplates or a lot of other engineers take this
  // approach and we'll see why I recommend, we not do it.
  // So inside this thing, we're going to simply form up some type of error
  // message and send it back to the user. So we take res object and we'll just
  // send some type of message and say something went wrong.
  // Now the key thing here is that with this `catch`, statement right here,
  // so with this catch statement, we're kind of assuming that we cannot
  // successfully render the page. So we're not going to attempt to render the
  // page here because we are just assuming that, hey, something went wrong.
  // So we are going to just abandon the entire server side rendering process
  // and show some error to the user.
  // So checking localhost:3000/admins and making sure we are logged out and
  // JS is disabled,
  // Now it says, 'Something went wrong' on the brower.
  //
  // Why is it a bad approach now?
  // This at least shows an error message to the user but why would this not be
  // a good approach is, well this one's kind of obvious. This would be a very
  // poor approach inside of a real application, because in this case, yeah,
  // something went wrong. But the error is due to something that the user can
  // very easily fix. Like we don't want to show the user an error message here.
  // We know what went wrong. We are showing an error message simply because
  // the user was not authenticated. So personally, I believe that if something
  // goes wrong during the server side rendering process, we should not just
  // give up, we should not quit and just say, hey like we did our best. But
  // that's really it. Like something went wrong. Try again later because this
  // error message that the user is seeing right here is never going to just
  // automatically fix itself.
  // We know, we're not really presenting anything to the user here that says,
  // Oh, we need to log in, we need to sign in to the application to visit this
  // page. So personally I think that just kind of bailing early and showing
  // an error message to the user, is not appropriate solution here at all!
  //
  // There's really nothing that we are showing there that is goig to indicate to
  // the user, hey just sign in and you'll be okay. And we can think, yeah
  // why don't we just show a message to the usre, like maybe figure out exactly
  // what requests went wrong out of our list of promises here and then put an
  // error message in here that says, 'Hey, you need to log in to visit this'.
  // Well, the easy answer to dhat is sometimes requests might fail without any
  // reason that we can figure out. In this particular case, yes, we know that
  // the request failed because the user was not signed in, but maybe the request
  // failed for some reason that we can't predict! Like maybe the API is just
  // having issues. Maybe our API is temporarily down for like five minutes or
  // something like that. Now in that case, if something went wrong, I still
  // don't really feel like we want to abandon the entire server side rendering
  // flow and show a generic error message.
  // I feel like we should still attempt to render our application, at lest get
  // like our header on the screen and our footer on the screen. And maybe,
  // we don't show any actual content in there but maybe we at least get our
  // application showing up and then show a generic error message inside there.
  // So in other words, short story, long story short here, I really don't think
  // that this very generic kind of escape hatch right here is the right approach.
  // I think that we need to still attempt to render our application and say
  // to the user, hey, something went wrong with this very specific data fetch
  // request. Maybe we try logging in or whatever it is, but I don't want to just
  // completely abandon the rendering attempt.
  // This is the approach 1st, that I do not recommend even though we will see
  // a lot of other server side rendering frameworks, kind of taking this
  // approach right here!
  Promise.all(promises)
    .then(() => {
      const context = {};

      // Right here is when it is actually a very good time to actually render
      // our application.
      // So now after all of our data loading functions have finished, we will
      // render the application and hopefully get all of our content to show up
      // on the screen as HTML.
      // res.send(renderer(req, store, context));

      const content = renderer(req, store, context);

      // Its totally okay to call the status before we send the response back
      if (context.notFound) {
        res.status(404);
      }

      res.send(content);
    })
    .catch(() => {
      res.send('Something went wrong');
    });

  console.log(promises);
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});

/* @ src/index.js (Server Side Code) */

// React SSR
/* @ Server Side Rendering (SSR)
 * - Generates HTML on the server
 * @ Server Side Templating (EJS)
 * - Generates HTML on the server
 *
 * SSR refers to our ability to somehow produce HTML on our server side and
 * ship it down to the user's browser.
 * The is kind of misleading terminology because technically we're doing
 * server side rendering even without React, or we can do server side rendering
 * without React. We could use HTML templates on the server like EJS, Handlebars
 * or Pug and that's really still server side rendering! So we could also refer
 * to that as server side templating.
 *
 * Some people decided that the term Server Side Rendering wasn't specific enough,
 * so they came up with two other terms.
 * @ Universal JavaScript
 * - The same code runs on the server and the browser
 * @ Isomorphic JavaScript
 * - The same code runs on the server and the browser
 *
 * So those two terms were Universal JavaScript and Isomorphic JavaScript.
 * Both these terms essentially mean that some amount of code that we're writing
 * on the server might also be executed on the browser, and the opposite is
 * true as well. So code that is intended for the browser might be executed
 * on the server.
 * There is one specific thing inside of our app that kind of flies right in the
 * face of this whole idea of Universal JavaScript or Isomorphic Javascript
 * and that is the two different module systems. So inside of index.js, we're
 * making use of CommonJS module system that is characterized by require
 * statements. But inside of our Home Component, we're using ES2015 Modules,
 * which is a distinctly different module system.
 * Part of working with Isomorphic or Universal JavaScript means that, we should
 * be able to use the exact same coding style on both our client side and
 * server side!
 * Normally we need to use CommonJS for NODE because no ES2015 Module was
 * supported for NODE until few years ago.
 * However, running Webpack and Babel over our entire codebase which includes
 * the NODEjs inside of this index.js file could make ES2015 Module system
 * work in NODEjs even before it was officially supported.
 * So because our server files are being handled by Webpack, we can make use of
 * ES2015 Modules on our Server Side code as well.
 * And we want to do that specifically to kind of lessen the distinction between
 * our server side code and and client side code.
 * In other words, as Engineers, as we're working on these projects, we don't
 * want to have to do a big context shift as we start working on our React
 * code versus Express code. We want to be able to write the exact same
 * dialect of JavaScript on both sides.
 *
 * @ Isomorphic React
 * - The same code runs on the server and the browser
 **/

// CommonJS module syntax or the `require` syntax

/* @ ReactDOM */
// ReactDOM library has `render` and also the `renderToString` fn
// `render` fn creates instances of a bunch of components and mounts them to a
// DOM node
// `renderToString` renders a bunch of components one time and produces a string
// out of all the resulting HTML. So rather than mounting to some DOM node,
// instead renders all those components to exactly one time, converts the
// output of them to raw HTML and returns it as a string.

/* @ Make NODE to recognize the JSX! */
// We're going to take the index.js and the Home.jss and feed those into
// Webpack and Babel. Babel will be responsible for turning all that JSX into
// normal ES5 code. We eventually end up with bundle.js file and we use NODE
// to run that file
// So by using the Webpack approach for our Server Side code, all we're really
// doing is saying, hey NODE: you don't have to handle any of the require
// statements before you run any code at all, Webpack will go through and
// build a bundle with all of our different modules included into it!

// When we run Webpack on the server, it spits out a compiled or transpiled
// JavaScript file that contains not only all of our server code but all of
// the React components inside of our application as well.

// Probelm I: JSX on the server
// Solution: Webpack and Babel
// With traditional React Apps, we normally have a bunch of JavaScript files
// to run all of our server side code and then a bunch of JavaScript files for
// our client side project.
// With Server Side Rendering (SSR), however, that all gets combined into one
// single application that contains both our Client and our Sever logic.
// So that is how we are able to render the client application on the server.

// Probelm II: Need to turn components into HTML
// Normally we use ReactDOM library's render function to take a component and
// mount it into a specifice DOM node on the server.
// On the server, we use the renderToString function to take a bunch of
// components and turn them into raw HTML.
// This renders all of our React Components exactly one time, builds an HTML
// strucuture out of them and then sends the result down to our browser.

/* @ Two Bundle by Webpack
 * We've now two separate bundles. One for server and one for client.
 * However, the client bundle is still not actually getting downloaded by
 * the browser when someone accesses our root ('/') route.
 * To make sure that our browser attempts to actually pick up that newly
 * created client side bundle. We'll first open all the folders on the public
 * directory to the outside world by telling Express to treat this public
 * directory as a freely available public directory.
 * */

// Webpack allows us to use ES2015 modules on our front end code.
// So because our server files are being handled by Webpack, we can now make
// use of ES2015 modules on our server side code as well.
// We want to do that to use the exact same coding style on both the React
// specific code and on our Server Side code (Express) as well

// @ Ignore files with Webpack
// When Webpack sees import statement example files or libraries like React,
// ReactDOM.. it  will go and grab all of the code that represents that module
// and pull that entire library into the output bundle.
// This is the behavior we want Webpack to work with browser applications but
// not with sever. So for browser based applications, we definitely want
// Webpack to behave in that fashion. We want Webpack to copy that entire library
// into the Bundle.js file because one of the big goals of Webpack on the
// browser is to condense down all of our assets into one single file.
//
// But on the server, which is where we are running this file here, that's a
// little bit of a different story.
// So here's what's happening on the Bundle. So on Server Side Webpack process
// that we're running.
// Our server bundle is importing Express, React and ReactDOM which means that
// when Webpack runs for our server process, it copies the source code, the
// entire source code of Express, React and ReactDOM into our output bundle.js
// file. This is not actually required because with NODE, unlike the browser,
// with NODE, we can require NODE modules at runtime when our server first
// starts up!!
//
// This isn't a big deal like it's not the worst thing in the world to be requiring
// these modules into the final bundle.js file because we are not shipping this
// server side bundle anywhere like we are with the browser. So we're not super
// concerned with the size of the server bundle at all. So The size of that
// file, not a big deal!
//
// BUT if we do reduce the number of libraries that needs to be placed into
// that bundle file on the Server Side, we'll end up with a faster webpack
// process, particularly during the initial startup Webpack run.
// So not a big deal
// BUT if our application starts to grow to be really large in size on the server,
// we can definately shave off a couple of seconds here from the initial Webpack
// startup time!!
// It's not the worst thing in the world.
// Hence, its good to keep Webpack from importing our libraries into our
// server bundle.

/* @ Render Helper
 * This refactor is going to seem small right now. But as soon as we start to
 * add in technologies like React Router, Redux and some other stuff, this
 * refactor is really going to pay off.
 * Inside of our index.js file, we appear to be locating every last scrap of
 * server side rendering logic inside this file right now. That's definitely
 * okay for now, but eventually we expect this route handler right here to
 * start to dramatically grow in size.
 * So to keep this file from getting too large, we should split out the logic
 * that renders our React app off to a separate file.
 * Right now, it's not going to be an immediate big difference. But as time
 * goes on, this separation of logic is going to really help to add clarity to
 * our server process.
 *
 * This definitely helps to separate out this Express related logic right here
 * from the actual server side rendering and React logic.
 * */

/*
const express = require('express');
// Making ES2015 modules (React, renderToStrinf, Home) works nicely
// with CommonJS module system
const React = require('react');
const renderToString = require('react-dom/server').renderToString;
const Home = require('./client/components/Home').default;
*/

/*
import express from 'express';
import renderer from './helpers/renderer';

const app = express();

// This tells express that it needs to treat that public directory as a static
// or public directory that is available to the outside world.
app.use(express.static('public'));

// Now whenever a request comes in, we call the render function. AND then
// we attempt to render our Home Component to a string, stick it into our
// HTML template and then return the entire thing.
// And the result all gets sent back to whoever made this initial request here.
app.get('/', (req, res) => {
  res.send(renderer());
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
*/
