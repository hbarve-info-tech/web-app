"use strict";
const webpack          = require("webpack");
const WebpackDevServer = require("webpack-dev-server");

const webpackConfig    = require("../webpack/development");
const webpackCompiler  = webpack(webpackConfig);

const options = {
  contentBase: "../public",
  compress: false,
  publicPath: "/public",
  headers: { "X-Custom-Header": "yes" },

  hot: true,
  inline: true,
  lazy: false,
  noInfo: true,

  host: 'localhost',
  port: 5001,
  proxy: {
    "*": "http://localhost:5000"
  },
  historyApiFallback: true,
  stats: {
    colors      : true,
    // hash        : false,
    // version     : false,
    // timings     : false,
    // assets      : false,
    // chunks      : true,
    // modules     : false,
    // reasons     : false,
    // children    : false,
    // source      : false,
    // errors      : false,
    // errorDetails: false,
    // warnings    : false,
    // publicPath  : false
  }
};

const webpackServer = new WebpackDevServer(webpackCompiler, options);

webpackServer.listen(5001, "localhost", function() {
  console.log('Webpack dev server started @ http://localhost:5001');
});
