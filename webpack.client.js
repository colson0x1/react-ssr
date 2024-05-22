const path = require('path');

module.exports = {
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

  // Tell webpack to run babel on every file it runs through
  // So this is where actually we tell Webpack to run Babel and make sure that
  // Babel takes all of that JSX and ES 2015 2016 2017.. code and turns it into
  // equivalent ES5.
  module: {
    rules: [
      {
        // First make sure that we only attempt to run Babel on JavaScript files
        // We can do that using Regex expression
        // This RegEx ensures that we only ever try to apply Babel to JavaScript
        // files
        test: /\.js?$/,
        // Now whenever one of these files is found, we're going to run the
        // loader called babel-loader.
        // So this is the actual Webpack loader module that executes Babel and
        // transpiles our code
        loader: 'babel-loader',
        // Tell Webpack to not run Babel over files inside of certain directories
        // It's where we wanna make sure that we don't attempt to run Babel
        // over anything inside of our node_modules directory
        // /node_modules/ is a Regex just like we're using for test
        exclude: /node_modules/,
        // Now these are options that will be passed along to the babel-loader
        options: {
          // So this is the actual rules that will be used by Babel to transpile
          // our code
          presets: [
            // First present we're going to run is 'react', that will take
            // all of our JSX and turn it into normal JavaScript function calls
            'react',
            // We're going to run another  preset called 'stage-0' which is
            // going to be used for handling some async code
            'stage-0',
            // And last one is going to be an array
            // Inside this array, this 'env' preset is kind of master preset that
            // Webpack uses. It essentially says, hey run all of the different
            // transform rules needed to meet the requirements of the latest
            // 2 versions of all popular browsers!
            // So this is kind of a catch all rule right here that will take
            // care of handling a lot of transpile stuff for us
            ['env', { targets: { browsers: ['last 2 versions'] } }],
          ],
        },
      },
    ],
  },
};
