/* eslint import/no-extraneous-dependencies: "warn" */

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: [
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
    filename: 'index.[hash].js',
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
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),

    new webpack.optimize.CommonsChunkPlugin({
      minChunks: Infinity,
      name: 'vendor',
      filename: 'vendor.[chunkhash].js',
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'meta',
      chunks: ['vendor'],
      filename: 'meta.[hash].js',
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false },
      sourceMap: true,
      beautify: false,
      dead_code: true,
    }),

    new HtmlWebpackPlugin({
      template: './src/template/index.hbs',
      inject: 'body',
    }),

    new ExtractTextPlugin('style.css'),
  ],
};
