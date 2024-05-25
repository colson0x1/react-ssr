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
  const promises = matchRoutes(Routes, req.path)
    .map(({ route }) => {
      // Now all of our loadData functions will have a reference to our server
      // side redux store
      return route.loadData ? route.loadData(store) : null;
    })
    .map((promise) => {
      if (promise) {
        return new Promise((resolve, reject) => {
          promise.then(resolve).catch(resolve);
        });
      }
    });

  /* @ Approach 3rd */
  // In Approach 2nd, we attempted to write some code that would render our
  // application even if something went wrong with one of our initial API
  // requests.
  // Now the downside to that approach as I explained was that we very quickly
  // realized that because Promise.all will fail early, if any of our requests
  // fail, the page will attempt to be rendered before all the other requests
  // are completed.
  // Now for our application, that's not quite such a big deal. But as soon as
  // we start adding in more requests, we would begin to see some of our requests
  // not be completed before we attempt to render the page. If any of our
  // requests started to air out.
  // Now we're going to code a similar solution that kind of gets around this
  // little limitation of the Promise.all function.
  //
  // So here's what we're gonna do!
  // The entire weakness of Promise.all is that it will immediately go to its
  // catch statement or it will immediately reject itself if any of the promises
  // that is passed are rejected. So what we're going to do is take all of those
  // promises that we collected from our load data function and we're going to
  // wrap them inside of a new promise.
  // So each and every action creator that generates a promise, each and every
  // single load data function that generates a promise, we're going to take
  // those and wrap them inside of a new promise.
  // So let's think there are 3 promise box inside Promise.all rectangle.
  // We're goint to take each of those promises (i.e each of the promis box),
  // and we're going to wrap them with a new promise. Each one gets its own
  // new promise and that is represented with the another 3 box that covers
  // each promises boxes.
  // Now those outer promises are going to watch the inner promise box!
  // Whenever the inner promise box is resolved or rejected, we will manually
  // resolve the outer promise box.
  // So the entire idea here is that we are just going to try to circumvent
  // this issues with Promise.all, where it will immediately short circuit as
  // soon as a promise that it passed rejects.
  // So we're still going to use Promise.all. We're still going to attempt to
  // render the page no matter what. But now, we are going to make sure that
  // every single request is given the opportunity to complete before we attempt
  // to render the page!
  // And we're gonna do that by wrapping all of our promises that come from the
  // load data functions with an outer promise that will always be resolved
  // whenever the inner one is resolved or rejected.
  //
  // So the line of code where we call all of our load data functions,
  // i.e const promises = matchRoutes()
  // And with each of these load data functions we call the load data and we
  // return the result of that. `route.loadData(store)` would be a promise right
  // there.
  // So essentially, we want to wrap this value right there (i.e route.loadData(store))
  // with a new promise. The new promise is going to watch this value.
  // Whenever that value is resolved or rejected, we will automatically resolve
  // the outer promise. So as far as Promise.all is concerned, it's going to think
  // that every single promise that is passed is always going to be successfully
  // resolved 100% of the time. But we know that, that's not entirely true.
  // So we're going to write the code that's going to create the new promise,
  // watch the inner promise, and then always resolve no matter what.
  // `matchRoutes()` right there is going to return an array of promises or the
  // value null. So we always have to keep in mind that some of the pages that
  // we render might not have a load data function.
  // So promises right there (i.e const promises = ..), may either be an array
  // of promises, but some of the values in there might possibly be null.
  // So we just got to keep that in mind as we write the code.
  // So we're going to chain on a second map statement there. So we're going
  // to iterate over the list of promises that is generated by this first
  // map right there. We're going to iterate over it. We're going to make our
  // new promises and we're going to always resolve them. So we're going to
  // add on a second map statement.
  // We absolutely create a new promise right there (i.e route.loadData(store)),
  // we could totally do that right inline but I think that would kind of
  // complicate the logic here. And it would be a little bit ugly.
  // So we're going to do the mapping step in just a second map function.
  // So we're going to map over this list of promises and null values. And for
  // every promise inside there, we are going to check to see if it is a promise.
  // So the if statement right there above is going to handle the case in which
  // we have some null values. So yes, if we have a promise here, then we will
  // return a new Promise.
  // Whenever we create a new Promise, we have to pass in a function that gets
  // called the instant this new Promise is created, the inner function gets
  // called with two functions of its own that we refer to as resolve and reject.
  // So then inside of that new Promise, we are going to look at the original
  // promise and we're going to say whenever this original promise (i.e if (promise) {}),
  // is resolve or rejected, we will instantly resolve thew new one that we
  // just created. (i.e return new Promise((resolve, reject) => {}))
  // Inside of it, we'll say promise.then(), then we'll pass in `resolve`,
  // we'll say .catch() and we'll pass in `resolve` there as well.
  // So no matter what, we're always going to resolve the inner promise, no matter
  // what. i.e promise.then(resolve).catch(resolve)
  //
  // So to summarize, we're just going to map the array of promises and null
  // values that were created. If it is a promise, we'll wrap it with a new
  // promise (i.e return new Promise((resolve, reject) => {})) and always
  // resolve it. And we pass that of to Promise.all
  // (i.e return new Promise((resolve, reject) => {})) to here below to
  // Promise.all(promises).then(() => { ... })
  // Now if we go to localhost:3000/admins and disable JavaScript, we're
  // still showing the protected or essentially we should say, we're still
  // showing our application. We're not actually showing any content there.
  // Since the output below Header navbar there is: 'Protected list of admins'.
  // So the user is probably going to still be thinking what's going on there,
  // where is my list of admins?
  // But at least, we are actually shhowing the content of the page and we
  // are showing the content of the page after all of our requests were
  // completed!!! Not as soon as one failed like with approach 2.
  // We are going to wait for every request on this approach, to be completed,
  // even if one of those failed. And then when everything is complete, we'll
  // then render our application and send it down to the user!!!!
  //
  // So we are able to get some content on the screen if one of our requests
  // go wrong. But that's really only half of the equation. Like we are able to
  // get some content on the screen, but still we kind of want to make sure
  // that the user understands why we are not showing a list of admins to them.
  // Like why is that list blank right there on the browser.

  Promise.all(promises).then(() => {
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

/* @ UnhandledPromiseRejectionWarning */
/* @ Rejection: Request failed with status code 401 */
// ->
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

/* @ Approach I: Add on a simple catch statement. */

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

/*
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
*/

/* @ Approach II */
// I don't recommend this second solution to use in our own application too.
// So the second solution really revolves around the fact that the big
// error right now is the Promise.all statement.
// So if anything goes wrong during this initial data loading request, we
// never execute the .then() function. So nothing here inside .then gets
// executed. So this second solution that I'm going to suggest here would
// be to say that, hey you know what? Even if something goes wrong during
// this initial data loading process right here, even if something goes poorly,
// let's still attempt to render the application. So even if something goes
// wrong, still attempt to render the application and send content back to the
// user.
// So for this solution, we're going to say that no matter what happens here,
// we're still going to run this .then() function. We're going to take this
// arrow function that we're passing to .then(), we're gonna cut the entire
// thing out and then we're going to assign it to a variable right above.
// Here we are calling it render. Then. with the Promise.all statement, we're
// going to say if everything goes correctly with waiting for these request,
// then run the render function (i.e .then()) and if anything goes poorly,
// still run the render function (i.e .catch())
//
// We're now saying that no matter what, we are going to always attempt to
// render our application and send a response back to the user.
// Back in the application, if we check the root route: localhost:300 and
// still being not authenticated, when we try to visit admin page. We get the
// text, Protected list of admins with Header.
// We don't see any list of admins there, but you know what? We at least
// showed some content to the user.
// So in this case, yes, things might be a little bit confusing. The user might
// be thinking where's my list of admins? And we are not very correctly or
// we're not really appropriately presenting any error message or anything
// to the user that says, Hey, here's why things are going wrong.
// But you know what? At least we have content showing up. At least we're
// not just showing some plain text that says, Hey, something went wrong.
// So I would say that this solution right here is at least better than the
// one we were just looking with approach I.
//
// However, there's still a really big hole with this solution, a really big
// problem.
// So if we really understand how Promise.all works, we're going to very
// quickly realize why this always attempt to render something.
// So the solution right here is really not going to be a good approach.
// So the key thing to remember is that as soon as Promise.all sees that
// one of the promises that we have passed to it has been rejected, the entire
// Promise.all statement fails and it instantly calls the .catch() function.
// So what's that really mean?
// Well, it means that if we have say three requests in the Promise.all,
// if we pass three promises to Promise.all and one succeeds and another fails,
// everything instantly goes to the catch function even if this third
// promise say was going to be successfully resolved.
// So in other words, we might be attempting to render our page before every
// request has been resolved or rejected, one or the other.
// In other words, we are rendering the application too early.
// So this is going to be a big issue if we are starting to access pages inside
// of our application that make a lot of data fetching requests. You know, let's
// say that we are attempting to make five requests to load a given page. If
// the very first request that gets responded to by our API results in an
// error, that means that the other four requests would not be allowed to
// finish and we would instantly attempt to render the page without getting
// any data back on those other four requests.
// So even though, yeah, we're at least showing some content here, it's still
// not the best approach in the world because ideally we would say, okay,
// you know, we understand that maybe this request right here failed, but
// let's at least wait for the other unresolved ones to finish before we go
// and attempt to render our application. So in other words, the issue with
// this approach right now is that we are attempting to just render the
// application too soon. We're not allowing other requests to be completed.
// We can easily imagine that if we were making maney requests, its very
// possible that the very first request that fails, everything else gets
// ignored and we instantly render the page and send the result back to the
// user. Ideally, we would wait for as many requests to be completed, either
// with success or error, so we would wait for those to be completed before
// attempting to render the page.
//
// So that's what really leads us into our third solution, the solution where
// we are still going to still pass all these requests to Promise.all, but
// this time around we're going to figure out a way to let every request to
// be either resolved or rejected before attempting to render the page!
/*
  const render = () => {
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
  };

  Promise.all(promises).then(render).catch(render);
*/
