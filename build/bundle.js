/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchAdmins = exports.FETCH_ADMINS = exports.fetchCurrentUser = exports.FETCH_CURRENT_USER = exports.fetchUsers = exports.FETCH_USERS = undefined;

var _axios = __webpack_require__(6);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// Fetch list of users
var FETCH_USERS = exports.FETCH_USERS = 'fetch_users';

// This fn gets automatically invoked by Redux Thunk. When Redux Thunk calls this
// function, it's now going to pass in three separate arguments. The first argument
// will be the dispatch function, the second argument will be the getState fn and
// the third is going to be this new little Axios instance that we passed in as
// third extra argument in client.js
// Now rathre than refer to it as `axiosInstance` here, which isn't like super
// clear what that really means, we're renaming this argument to simply be just
// `api` so that it'll be really clear that we can use this argument right here
// to get access to our API!
// So now whenever we make a request inside of our action creator, rather than
// using the base Axios library, we're going to use this customized Axios instance
// called api.

// So now as long as we make all of our request from our action creator file
// i.e actions/index.js, as long as we make all of our requests that are
// expected to go to our API with this `api` argument right here, no matter
// whether we are on the client or the server, it will always somehow end up
// making the request to the actual API hosted at Heroku app.
//
// NOTE: If we ever end up wanting to make a request to some target that is not
// our API, we do have to import axios and use essentially a non configured
// version of Axios.
// i.e import axios from 'axios';
// So we would not want to try to use this `api` object here we're receiving.
// If we wanted to make a request to like some like Instagram API or something
// like that or Snapchat API.
// So this copy of Axios right here, this `api` instance is only for use with
// our API. If we want to access anything else, we use the original axios library!
var fetchUsers = exports.fetchUsers = function fetchUsers() {
  return function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch, getState, api) {
      var res;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return api.get('/users');

            case 2:
              res = _context.sent;


              dispatch({
                type: FETCH_USERS,
                payload: res
              });

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();
};

// Action creator to fetch the current authentication status.
var FETCH_CURRENT_USER = exports.FETCH_CURRENT_USER = 'fetch_current_user';
var fetchCurrentUser = exports.fetchCurrentUser = function fetchCurrentUser() {
  return function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dispatch, getState, api) {
      var res;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return api.get('/current_user');

            case 2:
              res = _context2.sent;


              dispatch({
                type: FETCH_CURRENT_USER,
                payload: res
              });

            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function (_x4, _x5, _x6) {
      return _ref2.apply(this, arguments);
    };
  }();
};

var FETCH_ADMINS = exports.FETCH_ADMINS = 'fetch_admins';
// fetchAdmins is going to be an arrow function that returns asynchronous
// Redux Thunk function which receives three arguments here
var fetchAdmins = exports.fetchAdmins = function fetchAdmins() {
  return function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(dispatch, getState, api) {
      var res;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return api.get('/admins');

            case 2:
              res = _context3.sent;


              dispatch({
                type: FETCH_ADMINS,
                payload: res
              });

            case 4:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function (_x7, _x8, _x9) {
      return _ref3.apply(this, arguments);
    };
  }();
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("react-router-config");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // This is a file that's going to be shared between both the client and the
// server side codebases.

/* @ Prevent naming collison for loadData fn for multiple pages */
// Approach:
// Rather than exporting the component and the load data function separately,
// we're going to export one single object from each page component file.
// And in that object we will wrap up both the component and the load data fn!
// We'll then use our ES2015 spread syntax to dump both the component and the
// load data definition into our route structure.

/* import UsersListPage, { loadData } from './pages/UsersListPage'; */


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _App = __webpack_require__(12);

var _App2 = _interopRequireDefault(_App);

var _HomePage = __webpack_require__(14);

var _HomePage2 = _interopRequireDefault(_HomePage);

var _UsersListPage = __webpack_require__(15);

var _UsersListPage2 = _interopRequireDefault(_UsersListPage);

var _NotFoundPage = __webpack_require__(16);

var _NotFoundPage2 = _interopRequireDefault(_NotFoundPage);

var _AdminsListPage = __webpack_require__(26);

var _AdminsListPage2 = _interopRequireDefault(_AdminsListPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// We always want this App component to be visible and we definitely want any
// other component that is going to be shown inside of our application to be
// rendered inside of the App.

exports.default = [_extends({}, _App2.default, {
  // We did not tie a path to this App component. That means it will always
  // be displayed on the screen no matter what.

  // Last thing we have to do is, to make sure whenever we match one of these
  // child routes, they end up getting rendered by the App. So the App component
  // right there (i.e ...App), is going to be passed the child component
  // as a property and it's going to be up to the App component to figure out
  // that it needs to actually render whatever routes got matched as children.
  routes: [_extends({}, _HomePage2.default, {
    path: '/',
    // component: HomePage,
    exact: true
  }), _extends({}, _AdminsListPage2.default, {
    path: '/admins'
  }), _extends({}, _UsersListPage2.default, {
    // loadData,
    path: '/users'
    // component: UsersListPage,
  }), _extends({}, _NotFoundPage2.default)]
})];

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(9);

var _express = __webpack_require__(10);

var _express2 = _interopRequireDefault(_express);

var _reactRouterConfig = __webpack_require__(2);

var _expressHttpProxy = __webpack_require__(11);

var _expressHttpProxy2 = _interopRequireDefault(_expressHttpProxy);

var _Routes = __webpack_require__(4);

var _Routes2 = _interopRequireDefault(_Routes);

var _renderer = __webpack_require__(17);

var _renderer2 = _interopRequireDefault(_renderer);

var _createStore = __webpack_require__(20);

var _createStore2 = _interopRequireDefault(_createStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @ React Router DOM
// Server - StaticRouter
// -> For use when doing SSR
// Client - BrowserRouter
// -> For use when running in a browser

var app = (0, _express2.default)();

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
app.use('/api', (0, _expressHttpProxy2.default)('http://react-ssr-api.herokuapp.com', {
  proxyReqOptDecorator: function proxyReqOptDecorator(opts) {
    opts.headers['x-forwarded-host'] = 'localhost:3000';
    return opts;
  }
}));

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
app.use(_express2.default.static('public'));

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
app.get('*', function (req, res) {
  var store = (0, _createStore2.default)(req);

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
  var promises = (0, _reactRouterConfig.matchRoutes)(_Routes2.default, req.path).map(function (_ref) {
    var route = _ref.route;

    // Now all of our loadData functions will have a reference to our server
    // side redux store
    return route.loadData ? route.loadData(store) : null;
  });

  Promise.all(promises).then(function () {
    var context = {};

    // Right here is when it is actually a very good time to actually render
    // our application.
    // So now after all of our data loading functions have finished, we will
    // render the application and hopefully get all of our content to show up
    // on the screen as HTML.
    // res.send(renderer(req, store, context));

    var content = (0, _renderer2.default)(req, store, context);

    // Its totally okay to call the status before we send the response back
    if (context.notFound) {
      res.status(404);
    }

    res.send(content);
  });

  console.log(promises);
});

app.listen(3000, function () {
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

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("express-http-proxy");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterConfig = __webpack_require__(2);

var _Header = __webpack_require__(13);

var _Header2 = _interopRequireDefault(_Header);

var _actions = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// We're going to call renderRoutes as a function and then into it, we're going
// to pass in any routes that get mactched during the match routes process, will
// be passed into the app component as a prop called `route`.
// So this route right here contains a property on it called `routes` and that is
// the collection of components that we need to render inside of the App.
// So now any child routes that are matched will be automatically turned into
// route components by this renderRoutes function call and basically everything
// shows up!
/* @ Root Component */

var App = function App(_ref) {
  var route = _ref.route;

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_Header2.default, null),
    (0, _reactRouterConfig.renderRoutes)(route.routes)
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
exports.default = {
  component: App,
  loadData: function loadData(_ref2) {
    var dispatch = _ref2.dispatch;
    return dispatch((0, _actions.fetchCurrentUser)());
  }
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(5);

var _reactRedux = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Now Header component should be receiving a prop of auth
var Header = function Header(_ref) {
  var auth = _ref.auth;

  // console.log('My auth status is', auth);

  var authButton = auth ? _react2.default.createElement(
    'a',
    { href: '/api/logout' },
    'Logout'
  ) : _react2.default.createElement(
    'a',
    { href: '/api/auth/google' },
    'Login'
  );

  return _react2.default.createElement(
    'nav',
    null,
    _react2.default.createElement(
      'div',
      { className: 'nav-wrapper' },
      _react2.default.createElement(
        _reactRouterDom.Link,
        { className: 'brand-logo', to: '/' },
        'React SSR'
      ),
      _react2.default.createElement(
        'ul',
        { className: 'right' },
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            _reactRouterDom.Link,
            { to: '/users' },
            'Users'
          )
        ),
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            _reactRouterDom.Link,
            { to: '/admins' },
            'Admins'
          )
        ),
        _react2.default.createElement(
          'li',
          null,
          authButton
        )
      )
    )
  );
};

function mapStateToProps(_ref2) {
  var auth = _ref2.auth;

  return { auth: auth };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Header);

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Home = function Home() {
  return _react2.default.createElement(
    'div',
    { className: 'center-align', style: { marginTop: '200px' } },
    _react2.default.createElement(
      'h3',
      null,
      'Welcome'
    ),
    _react2.default.createElement(
      'p',
      null,
      'Check out these awesome features'
    )
  );
}; // ES2015 Modules syntax or the `import .. export` syntax

exports.default = {
  component: Home
};

/* @ Normal React Application
 * In a normal traditional React application, we would have a JavaScript file
 * that gets loaded into the browser and that then gets executed. The JS file
 * would render our JavaScript application, stick it into the DOM and then
 * attach any related event handlers that we set up inside of the code base.
 * So with the normal application, we ship down our entire JavaScript bundle
 * file to the browser and that renders the app and sets up event handlers
 * inside the browser.
 *
 * With this current setup, there's no JavaScript code being set down to the
 * users browser right now.
 * We make a request to the root route, the express server sends back the HTML
 * from that Home component and absolutely nothing else. There's no JS code
 * that is being loaded into the browser that sets up that event handler for us.
 * We could check that on the network log in response.
 * So in order to actually make sure that we get some JavaScript or have our
 * application work correctly, we need to make sure that we somehow ship down
 * all the JavaScript code related to our application after we ship down all
 * this HTML that gets some initial content on the screen.
 *
 * So right now in the Server Side world, we are taking care of step number one.
 * Step number one is getting HTML or getting content to show up on the screen.
 * Step number two is, however, is to make sure that we then load up our
 * React application and have the React application set up all the event handlers
 * and action creators and data loading requests and all that kind of stuff that
 * we normally want to have occur inside of our application.
 *
 * Solution to that Pain Point:
 * Create two JavaScript bundles using Webpack. One bundle is going to contain
 * all of our server side and client side code i.e our current setup
 * webpack.server.js AND now we create another bundle for React app which will
 * be shipped down to the users browser.
 * The reason we want to have two bundles is our Server Side bundle and the
 * Server Side code inside of it might contain sensitive information or sensitive
 * code. For example, it might contain some secret API keys or special logic
 * that could somehow be exploited. So there's going to be some amount of code on
 * our server that we never want to ship down to the browser.
 * So to implement this, we are going to set up a second Webpack pipeline that's
 * going to run right along side our current one.
 */

/*
import React from 'react';

const Home = () => {
  return (
    <div style={{ color: 'dodgerblue' }}>
      Home Component!!!
      <button onClick={() => console.log('Hi there!')}>Press me!</button>
    </div>
  );
};

export default Home;
*/

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(3);

var _actions = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UsersList = function (_Component) {
  _inherits(UsersList, _Component);

  function UsersList() {
    _classCallCheck(this, UsersList);

    return _possibleConstructorReturn(this, (UsersList.__proto__ || Object.getPrototypeOf(UsersList)).apply(this, arguments));
  }

  _createClass(UsersList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.fetchUsers();
    }
  }, {
    key: 'renderUsers',
    value: function renderUsers() {
      return this.props.users.map(function (user) {
        return _react2.default.createElement(
          'li',
          { key: user.id },
          user.name
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        'Big list of users:',
        _react2.default.createElement(
          'ul',
          null,
          this.renderUsers()
        )
      );
    }
  }]);

  return UsersList;
}(_react.Component);

function mapStateToProps(state) {
  return { users: state.users };
}

function loadData(store) {
  // console.log('Trying to load some data...');
  // We're going to do a manual dispatch here and we're going to call the
  // fetchUsers action creator and pass the result into store.dispatch
  // So now fetchUsers will be called. It will make a network request to the
  // API and it's going to return a promise representing the network request
  // to make sure that the promise is created, gets send back to our index.js
  // file.
  // So the thing that actually calls loadData, we're going to return the result
  // of all of this stuff right here.
  return store.dispatch((0, _actions.fetchUsers)());
}

// export { loadData };
exports.default = {
  // We will assign the load data fn to a key of load data
  loadData: loadData,
  // And then, The component that is produced by the connect fn right here
  // will be assigned to a component key.
  component: (0, _reactRedux.connect)(mapStateToProps, { fetchUsers: _actions.fetchUsers })(UsersList)
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NotFoundPage = function NotFoundPage(_ref) {
  var _ref$staticContext = _ref.staticContext,
      staticContext = _ref$staticContext === undefined ? {} : _ref$staticContext;

  staticContext.notFound = true;

  return _react2.default.createElement(
    'h1',
    { style: { color: 'orangered' } },
    'Oops, route not found.'
  );
};

// Now this is a Page type component, so we're going to use that alternate
// export syntax where we export default an object that has a key of component
// and then a value od the component we just created!
exports.default = {
  component: NotFoundPage
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(18);

var _reactRouterDom = __webpack_require__(5);

var _reactRedux = __webpack_require__(3);

var _reactRouterConfig = __webpack_require__(2);

var _serializeJavascript = __webpack_require__(19);

var _serializeJavascript2 = _interopRequireDefault(_serializeJavascript);

var _Routes = __webpack_require__(4);

var _Routes2 = _interopRequireDefault(_Routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @ StaticRouter Context
 * Figure out when to make a response with 404 with StaticRouter
 * */
// This context prop right here in the StaticRouter and the object we pass into
// it is what gives us the ability to communicate from our rendered components
// back to this renderer file!
// So the context object that we create and pass to the static router as a prop,
// The StaticRouter takes that  context object and passes it as a prop down into
// any component that it renders. So the context object ends up as a prop inside of
// the not found page. So inside of the not found page component, we can receive
// that context object as a prop and we will add an `error` property to that object.
// Then after this StaticRouter finishes up all of its rendering stuff, we can
// examine that context object and check to see if any of the components that it
// was passed to marked it with an air. If it did, then we know that something
// went wrong during the rendering process.
// So in other words, pass in an empty object, mark it inside of some component
// where we know that something went wrong! And if we're showing the not found
// page, then clearly we know that something went wrong.
// After StaticRouter runs, we inspect the context object and check to see if
// something went wrong.
//
// Now the real changing part is, connecting the context object which communicates
// some error message to the response object from Express, which is what we're
// going to use to mark the response as being a 404.
// So to connect these two parts together in `index.js`, we're going to define our
// context object inside of * route handler and then we're going to pass it
// into the `renderer` function there as a third argument.
// And then we're going to receive that third argument of context and rather
// than passing in an emtpy object for the context prop right here, we'll pass
// in that context argument like so. i.e context={context}
// So now the object that we're creating inside the `index.js` file is going to
// be passed into the StaticRouter as a prop. Then the StaticRouter is going to
// take that object context right here (i.e context={context}) and pass it down
// to all of our rendered components!
// So the next thing we're going to do is open up our NotFoundPage component and
// accept this context thing as a prop.
// There on that not found page, it's going to get passed as a prop called
// `staticContext`. So internally, the StaticRouter renames that prop from
// `context` to `staticContext`.
// Now one thing, if we're rendering our application on the client side or on the
// browser and we try to receive this `staticContext` thing, it won't exist in the
// browser. Only the staticRouter implements this context thing. So if we try
// to receive this as a prop on the browser, it won't exist because in the browser
// we are rendering our application with a BrowserRouter!
// We need to default the value of `staticContext` to be an empty object there
// if it wasn't defined as a prop.

exports.default = function (req, store, context) {
  var content = (0, _server.renderToString)(_react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(
      _reactRouterDom.StaticRouter,
      { location: req.path, context: context },
      _react2.default.createElement(
        'div',
        null,
        (0, _reactRouterConfig.renderRoutes)(_Routes2.default)
      )
    )
  ));

  return '\n    <html>\n      <head>\n        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">\n      </head>\n      <body>\n        <div id=\'root\'>' + content + '</div>\n        <script>\n          window.INITIAL_STATE = ' + (0, _serializeJavascript2.default)(store.getState()) + '\n        </script>\n        <script src=\'bundle.js\'></script>\n      </body>\n    </html>\n  ';
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

// No need to import Home component because Home Component is rendered by the
// Routes Component
// This file is going to house a function that will simply render our React
// app and return it as a string

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("serialize-javascript");

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(7);

var _reduxThunk = __webpack_require__(21);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _axios = __webpack_require__(6);

var _axios2 = _interopRequireDefault(_axios);

var _reducers = __webpack_require__(22);

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @ Redux on SSR
 * Redux needs to be different configuration on Browser vs Server:
 * We're going to create two different stores. And we're going to have one
 * store for the browser bundle and one store for the server bundle.
 */

exports.default = function (req) {
  var axiosInstance = _axios2.default.create({
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
    headers: { cookie: req.get('cookie') || '' }
  });

  // So now whenever that above Axios instance is used to make requests to the
  // API, the API is going to be absolutely tricked into thinking that the
  // request is coming from a real user.
  // So now the last thing we have to do is take that `axiosInstance` and
  // get it to show up inside of our action creator, just like how we did
  // on the client side.
  var store = (0, _redux.createStore)(_reducers2.default, {}, (0, _redux.applyMiddleware)(_reduxThunk2.default.withExtraArgument(axiosInstance)));

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

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(7);

var _usersReducer = __webpack_require__(23);

var _usersReducer2 = _interopRequireDefault(_usersReducer);

var _authReducer = __webpack_require__(24);

var _authReducer2 = _interopRequireDefault(_authReducer);

var _adminsReducer = __webpack_require__(25);

var _adminsReducer2 = _interopRequireDefault(_adminsReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
  users: _usersReducer2.default,
  auth: _authReducer2.default,
  // We'll sign up that reducer (i.e adminsReducer) to the `admins` piece of state
  admins: _adminsReducer2.default
});

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actions = __webpack_require__(1);

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments[1];

  switch (action.type) {
    case _actions.FETCH_USERS:
      return action.payload.data;
    default:
      return state;
  }
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments[1];

  switch (action.type) {
    case _actions.FETCH_CURRENT_USER:
      return action.payload.data || false;
    default:
      return state;
  }
};

var _actions = __webpack_require__(1);

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actions = __webpack_require__(1);

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments[1];

  switch (action.type) {
    case _actions.FETCH_ADMINS:
      return action.payload.data;
    default:
      return state;
  }
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(3);

var _actions = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AdminsListPage = function (_Component) {
  _inherits(AdminsListPage, _Component);

  function AdminsListPage() {
    _classCallCheck(this, AdminsListPage);

    return _possibleConstructorReturn(this, (AdminsListPage.__proto__ || Object.getPrototypeOf(AdminsListPage)).apply(this, arguments));
  }

  _createClass(AdminsListPage, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.fetchAdmins();
    }
  }, {
    key: 'renderAdmins',
    value: function renderAdmins() {
      return this.props.admins.map(function (admin) {
        return _react2.default.createElement(
          'li',
          { key: admin.id },
          admin.name
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h3',
          { style: { color: 'springgreen' } },
          'Protected list of admins'
        ),
        _react2.default.createElement(
          'ul',
          null,
          this.renderAdmins()
        )
      );
    }
  }]);

  return AdminsListPage;
}(_react.Component);

function mapStateToProps(_ref) {
  var admins = _ref.admins;

  return { admins: admins };
}

exports.default = {
  // We do want to call the action creator from within this component just in
  // case we ever have a user land on, say, our home route and then navigate
  // over inside of our application to the admins route. So we'll pass in our
  // fetchAdmins action creator
  component: (0, _reactRedux.connect)(mapStateToProps, { fetchAdmins: _actions.fetchAdmins })(AdminsListPage),
  // We don't need receive the entire store. All we really care about is the
  // dispatch function here. With a dispath fn, we will call and pass in the
  // fetchAdmins action creator.
  loadData: function loadData(_ref2) {
    var dispatch = _ref2.dispatch;
    return dispatch((0, _actions.fetchAdmins)());
  }
};

/***/ })
/******/ ]);