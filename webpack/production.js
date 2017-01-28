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
      'medium-draft',
      'isomorphic-fetch',
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
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: ['es2015', 'stage-0', 'react'],
              plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader',
        }),
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader!sass-loader',
        }),
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
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
