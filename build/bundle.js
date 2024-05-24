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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(17);

var _express = __webpack_require__(3);

var _express2 = _interopRequireDefault(_express);

var _reactRouterConfig = __webpack_require__(18);

var _Routes = __webpack_require__(7);

var _Routes2 = _interopRequireDefault(_Routes);

var _renderer = __webpack_require__(4);

var _renderer2 = _interopRequireDefault(_renderer);

var _createStore = __webpack_require__(9);

var _createStore2 = _interopRequireDefault(_createStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @ React Router DOM
// Server - StaticRouter
// -> For use when doing SSR
// Client - BrowserRouter
// -> For use when running in a browser

var app = (0, _express2.default)();

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
  var store = (0, _createStore2.default)();

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
    // Right here is when it is actually a very good time to actually render
    // our application.
    // So now after all of our data loading functions have finished, we will
    // render the application and hopefully get all of our content to show up
    // on the screen as HTML.
    res.send((0, _renderer2.default)(req, store));
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
/* 3 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(5);

var _reactRouterDom = __webpack_require__(1);

var _reactRedux = __webpack_require__(6);

var _reactRouterConfig = __webpack_require__(18);

var _Routes = __webpack_require__(7);

var _Routes2 = _interopRequireDefault(_Routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

// No need to import Home component because Home Component is rendered by the
// Routes Component
// This file is going to house a function that will simply render our React
// app and return it as a string

exports.default = function (req, store) {
  var content = (0, _server.renderToString)(_react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(
      _reactRouterDom.StaticRouter,
      { location: req.path, context: {} },
      _react2.default.createElement(
        'div',
        null,
        (0, _reactRouterConfig.renderRoutes)(_Routes2.default)
      )
    )
  ));

  return '\n    <html>\n      <head></head>\n      <body>\n        <div id=\'root\'>' + content + '</div>\n        <script src=\'bundle.js\'></script>\n      </body>\n    </html>\n  ';
};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 7 */
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

var _HomePage = __webpack_require__(19);

var _HomePage2 = _interopRequireDefault(_HomePage);

var _UsersListPage = __webpack_require__(20);

var _UsersListPage2 = _interopRequireDefault(_UsersListPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [_extends({}, _HomePage2.default, {
  path: '/',
  // component: HomePage,
  exact: true
}), _extends({}, _UsersListPage2.default, {
  // loadData,
  path: '/users'
  // component: UsersListPage,
})];

/***/ }),
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(10);

var _reduxThunk = __webpack_require__(11);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reducers = __webpack_require__(12);

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

exports.default = function () {
  var store = (0, _redux.createStore)(_reducers2.default, {}, (0, _redux.applyMiddleware)(_reduxThunk2.default));

  return store;
}; /* @ Redux on SSR
    * Redux needs to be different configuration on Browser vs Server:
    * We're going to create two different stores. And we're going to have one
    * store for the browser bundle and one store for the server bundle.
    */

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(10);

var _usersReducer = __webpack_require__(13);

var _usersReducer2 = _interopRequireDefault(_usersReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
  users: _usersReducer2.default
});

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actions = __webpack_require__(14);

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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchUsers = exports.FETCH_USERS = undefined;

var _axios = __webpack_require__(15);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// Fetch list of users
var FETCH_USERS = exports.FETCH_USERS = 'fetch_users';

var fetchUsers = exports.fetchUsers = function fetchUsers() {
  return function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch) {
      var res;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _axios2.default.get('http://react-ssr-api.herokuapp.com/users');

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

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
};

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 16 */,
/* 17 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("react-router-config");

/***/ }),
/* 19 */
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
    { style: { color: 'dodgerblue' } },
    'Home Component!!!',
    _react2.default.createElement(
      'button',
      { onClick: function onClick() {
          return console.log('Hi there!');
        } },
      'Press me!'
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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(6);

var _actions = __webpack_require__(14);

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

/***/ })
/******/ ]);