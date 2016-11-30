"use strict";
const path    = require("path");
const webpack = require("webpack");

module.exports = {
  entry : {
    app: [
      "webpack-dev-server/client?http://localhost:5001/",
      'webpack/hot/dev-server',
      'react-hot-loader/patch',
      "./src/client/index.js"
    ]
  },
  output: {
    path: path.resolve(__dirname, "public"),
    publicPath: "/",
    filename: "bundle.js"
  },
  devTools: 'inline-source-map',
  devServer: {
    inline: true,
    port: 5001,
    contentBase: "./public"
  },
  resolve : {
    alias: {
      'redux-devtools': path.join(__dirname, 'node_modules', 'redux-devtools'),
      'react'         : path.join(__dirname, 'node_modules', 'react')
    }
  },
  resolveLoader: {
    'fallback': path.join(__dirname, 'node_modules')
  },
  module : {
    loaders: [
      {
        test    : /(\.js|\.jsx)$/,
        exclude : /(node_modules)/,
        loader  : 'babel-loader',
        query   : {
          presets: ['es2015', 'stage-0', 'react'],
          plugins : ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
        }
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: path.join(__dirname, 'node_modules', 'redux-devtools', 'src')
      },
      {test: /\.css$/,  loaders: ["style", "css"]},
      {test: /\.scss$/, loaders: ["style", "css", "sass"]},
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
    new webpack.EnvironmentPlugin(["NODE_ENV", "DEV_ENV", "REDUX"]),
    new webpack.HotModuleReplacementPlugin()
  ]
};
