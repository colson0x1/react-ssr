const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const config = {
  // Inform webpack that we're building a bundle for NODEjs, rahter than for the
  // browser.
  // By defauly webpack assumes that we're building a bundle to be
  // executed inside of a browser.
  target: 'node',

  // Tell webpack the root file of our server application
  entry: './src/index.js',

  // Tell webpack where to put the output file
  // It's essentially saying, after building bundle.js file for our server
  // side code, here's where that bundle file should be
  output: {
    filename: 'bundle.js',
    // dirname is a reference to the current working directory that our project
    // is being executed in
    // and we're saying inside that directory, we want to place the output
    // bundle into a new folder called build
    // We don't have to create this folder ourselves. It will be automatically
    // created by Webpack when it runs
    path: path.resolve(__dirname, 'build'),
  },
};

module.exports = merge(baseConfig, config);
