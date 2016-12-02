"use strict";
const webpack          = require("webpack");
const WebpackDevServer = require("webpack-dev-server");

let webpackConfig = {};

if(process.env.REDUX === 'true') {
  webpackConfig = require("./webpack.config.dev-redux");
}
else {
  webpackConfig = require("./webpack.config.dev");
}

const webpackCompiler  = webpack(webpackConfig);

const options = {
  contentBase: "./public",
  hot: true,
  historyApiFallback: true,
  compress: false,
  proxy: {
    "*": "http://localhost:5000"
  },
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
};

const webpackServer = new WebpackDevServer(webpackCompiler, options);

webpackServer.listen(5001, "localhost", function() {
  console.log('Webpack dev server started @ http://localhost:5001');
});
