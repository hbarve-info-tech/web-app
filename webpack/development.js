"use strict";
const path    = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry : {
    app: [
      "webpack-dev-server/client?http://localhost:5001/",
      'webpack/hot/dev-server',
      'react-hot-loader/patch',
      "./src/client/index.js"
    ],
    vendor: [
      "react",
      "react-dom",
      "react-router",
      "react-redux",
      "react-bootstrap",
      "redux",
      "redux-thunk",
      "medium-draft",
      "isomorphic-fetch"
    ]
  },
  output: {
    path: __dirname + "/../public",
    publicPath: "/public",
    pathinfo: true,
    filename: "index.js"
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
        loaders: ["style-loader", "css-loader"]},
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin(["NODE_ENV", "DEV_ENV"]),
    new webpack.HotModuleReplacementPlugin(),

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
