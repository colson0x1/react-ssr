const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const config = {
  // This is a bundle that is intended for use on the browser so we're not
  // targeting NODE as our runtime anymore.

  // Tell webpack the entry point file to run inside our client project directory
  // `index.js` inside the src directory contains a tremendous amount of server
  // related code like different route handlers and what not
  // so we're going to make a new client file inside of our client project dir.
  entry: './src/client/client.js',

  // Tell webpack where to put the output file
  // It's essentially saying, after building bundle.js file for our server
  // side code, here's where that bundle file should be
  // Rather than stuffing the output into the build directory, we're going to
  // make a new folder called `public` and stash this file inside of there.
  // We're gonna put this file inside new public directory because it needs to
  // be publicly available to anyone who asks for this JavaScript file, this
  // client side file. So here we update the path from `build` to `public`
  output: {
    filename: 'bundle.js',
    // dirname is a reference to the current working directory that our project
    // is being executed in
    // and we're saying inside that directory, we want to place the output
    // bundle into a new folder called public
    // We don't have to create this folder ourselves. It will be automatically
    // created by Webpack when it runs
    path: path.resolve(__dirname, 'public'),
  },

  // And then as far as all the Babel stuff down here, that can all stay the
  // same.
  // It kind of is important to keep all this Bable config similar between
  // the client side and server side to make sure that, we are able to write the
  // exact same style of JavaScript on both the client and the server.
};

module.exports = merge(baseConfig, config);
