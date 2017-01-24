/* eslint import/no-extraneous-dependencies: "warn" */

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from '../webpack/development';

const webpackCompiler = webpack(webpackConfig);

const options = {
  contentBase: '../public/',
  compress: false,
  publicPath: '/public/',
  headers: { 'X-Custom-Header': 'yes' },

  hot: true,
  inline: true,
  lazy: false,
  noInfo: true,

  host: 'localhost',
  port: 5001,
  proxy: {
    '*': 'http://localhost:5000',
  },
  historyApiFallback: true,

  // https://webpack.js.org/configuration/stats/#stats
  stats: 'none',
};

const webpackServer = new WebpackDevServer(webpackCompiler, options);

webpackServer.listen(5001, 'localhost', () => {
  console.log('Webpack dev server started @ http://localhost:5001');
});
