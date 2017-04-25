/* eslint import/no-extraneous-dependencies: "warn" */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:5001/',
      'webpack/hot/only-dev-server',
      './src/client/index.js',
    ],
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'react-redux',
      'redux',
      'redux-thunk',
    ],
  },
  output: {
    path: `${__dirname}/../public/`,
    publicPath: '/public/',
    pathinfo: true,
    filename: 'index.js',
  },
  context: path.resolve(__dirname, '..'),
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    // enable HMR on the server

    contentBase: path.resolve(__dirname, '..', 'public'),
    // match the output path

    publicPath: '/public/',
    // match the output `publicPath`
  },
  module: {
    rules: [
      {
        test: /(\.js|\.jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'stage-0', 'react'],
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'] },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),

    // enable HMR globally
    new webpack.HotModuleReplacementPlugin(),

    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      minChunks: Infinity,
      name: 'vendor',
      filename: 'vendor.js',
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'meta',
      chunks: ['vendor'],
      filename: 'meta.js',
    }),

    new HtmlWebpackPlugin({
      template: './src/template/index.hbs',
      inject: 'body',
    }),
  ],
};
