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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
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


var _express = __webpack_require__(2);

var _express2 = _interopRequireDefault(_express);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(3);

var _Home = __webpack_require__(4);

var _Home2 = _interopRequireDefault(_Home);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

/*
const express = require('express');
// Making ES2015 modules (React, renderToStrinf, Home) works nicely
// with CommonJS module system
const React = require('react');
const renderToString = require('react-dom/server').renderToString;
const Home = require('./client/components/Home').default;
*/

var app = (0, _express2.default)();

// This tells express that it needs to treat that public directory as a static
// or public directory that is available to the outside world.
app.use(_express2.default.static('public'));

app.get('/', function (req, res) {
  var content = (0, _server.renderToString)(_react2.default.createElement(_Home2.default, null));

  var html = '\n    <html>\n      <head></head>\n      <body>\n        <div id=\'root\'>' + content + '</div>\n        <script src=\'bundle.js\'></script>\n      </body>\n    </html>\n  ';

  res.send(html);
});

app.listen(3000, function () {
  console.log('Listening on port 3000');
});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 4 */
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

exports.default = Home;

/***/ })
/******/ ]);