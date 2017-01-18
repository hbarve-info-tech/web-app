'use strict';
const path    = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry : {
    app: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:5001/',
      'webpack/hot/only-dev-server',
      './src/client/index.js'
    ],
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'react-redux',
      'material-design-lite',
      'redux',
      'redux-thunk',
      'medium-draft',
      'isomorphic-fetch'
    ]
  },
  output: {
    path: __dirname + '/../public',
    publicPath: '/public',
    pathinfo: true,
    filename: 'index.js'
  },
  context: path.resolve(__dirname, '..'),
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    // enable HMR on the server

    contentBase: path.resolve(__dirname, '..', 'public'),
    // match the output path

    publicPath: '/public'
    // match the output `publicPath`
  },

  module: {
    rules: [
      {
        test   : path.join(__dirname, '..', 'src', 'client'),
        // test   : /(\.js|\.jsx)$/,
        exclude: /(node_modules)/,
        use    : [
          {
            loader: 'babel-loader',
            query : {
              presets: ['es2015', 'stage-0', 'react'],
              plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
            }
          }
        ]
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']},
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV', 'DEV_ENV']),

    // enable HMR globally
    new webpack.HotModuleReplacementPlugin(),

    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      minChunks: Infinity,
      name     : 'vendor',
      filename : 'vendor.js'
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name    : 'meta',
      chunks  : ['vendor'],
      filename: 'meta.js'
    }),

    new HtmlWebpackPlugin({
      template: './src/template/index.html',
      inject  : 'body'
    }),

    // new ExtractTextPlugin('style.css')
  ]
};
