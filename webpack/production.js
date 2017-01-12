"use strict";
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry : {
    app: [
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
        test   : /(\.js|\.jsx)$/,
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
    new webpack.EnvironmentPlugin(["NODE_ENV"]),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'] // Specify the common bundle's name.
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress : { warnings: false },
      output   : { comments: false },
      sourceMap: true,
      beautify : false,
      dead_code: true
    }),
    new HtmlWebpackPlugin({
      template: './src/template/index.html',
      inject  : 'body'
    }),
    new ExtractTextPlugin('style.css')
  ]
};
