"use strict";
const path    = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry : {
    app: [
      "webpack-dev-server/client?http://localhost:5001/",
      "./src/client/index.js"
    ],
    vendor: ["react", "react-dom"]
  },
  output: {
    path: __dirname + "/../public",
    publicPath: "/public",
    pathinfo: true,
    filename: "[name].js"
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
        loader: ExtractTextPlugin.extract({
          fallbackLoader: "style-loader",
          loader        : "css-loader"
        })
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin(["NODE_ENV", "DEV_ENV"]),
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      minChunks: 2,
      names    : ['vendor', 'manifest'] // Specify the common bundle's name.
    }),
    new HtmlWebpackPlugin({
      template: './src/template/index.html',
      inject  : 'body'
    }),
    new ExtractTextPlugin('style.css')
  ]
};
