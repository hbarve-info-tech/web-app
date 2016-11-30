"use strict";
const path              = require("path");
const webpack           = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");


// multiple extract instances
let extractCSS = new ExtractTextPlugin('style.css');

module.exports = {
  entry  : {
    app: [
      "./src/client/index.js"
    ]
  },
  output : {
    path      : path.resolve(__dirname, "public"),
    publicPath: "/",
    filename  : "bundle.js"
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
        test: /\.css$/i,
        loader: extractCSS.extract(['css'])
      },
      {
        test: /\.scss$/i,
        loader: extractCSS.extract(['css','sass'])
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
    new webpack.EnvironmentPlugin(["NODE_ENV"]),
    new webpack.NoErrorsPlugin(),
    extractCSS,
    new webpack.optimize.UglifyJsPlugin({
      compress : { warnings: false },
      output   : { comments: false },
      sourceMap: true
    })
  ]
};
