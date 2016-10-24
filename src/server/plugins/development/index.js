/**
 * Created by himank on 3/8/16.
 *
 * This plugin contains development environment for 'client' (react.js + redux.js)
 *
 */
"use strict";
//Global constants are defined here.
const NODE_ENV = process.env.NODE_ENV;  // Node Environment may have value 'development' or 'production'
const DEV_ENV  = process.env.DEV_ENV;   // Development Environment may have value 'server' or 'client'

//Variable declaration.
import webpack          from "webpack";
import WebpackDevServer from "webpack-dev-server";

//Importing webpack configuration file from root directory.
import webpackConfig from "../../../../webpack.config";

// Creating compiler of webpack.
const webpackCompiler = webpack(webpackConfig);

const clientDevelopment = () => {
  //new webpack dev server is created here and configured.
  const webpackServer = new WebpackDevServer(webpackCompiler, {
    // webpack-dev-server options

    contentBase: "../../../public",
    // or: contentBase: "http://localhost/",

    hot: true,
    // Enable special support for Hot Module Replacement
    // Page is no longer updated, but a "webpackHotUpdate" message is send to the content
    // Use "webpack/hot/dev-server" as additional module in your entry point
    // Note: this does _not_ add the `HotModuleReplacementPlugin` like the CLI option does.

    // Set this as true if you want to access dev server from arbitrary url.
    // This is handy if you are using a html5 router.
    historyApiFallback: true,

    // Set this if you want to enable gzip compression for assets
    compress: false,

    // Set this if you want webpack-dev-server to delegate a single path to an arbitrary server.
    // Use "*" to proxy all paths to the specified server.
    // This is useful if you want to get rid of 'http://localhost:8080/' in script[src],
    // and has many other use cases (see https://github.com/webpack/webpack-dev-server/pull/127 ).
    proxy: {
      "*": "http://localhost:5000"
    },

    // webpack-dev-middleware options
    quiet: false,
    noInfo: false,
    // lazy: true,
    filename: "bundle.js",
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    publicPath: "/",
    headers: { "X-Custom-Header": "yes" },
    stats: {
      colors: true
    }
  });

  webpackServer.listen(5001, "localhost", function() {
    console.log('Webpack dev server started @ http://localhost:5001');
  });
};



export const register = (server, options, next) => {

  //If development environment is for client then we want to be client bundle.js file to be dynamically generate.
  //So we only generate bundle.js file dynamically using webpack dev server.
  clientDevelopment();

  next();
};

register.attributes = {
  pkg : {
    "name": "Development",
    "version": "0.0.1",
    "description": "This plugin contains all the features related to development environment for this project, i.e. server-development and client-development."
  }
};