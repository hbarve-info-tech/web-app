"use strict";
const NODE_ENV = process.env.NODE_ENV || 'production';

//Variable declaration.
const path              = require("path");
const webpack           = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");


// multiple extract instances
let extractCSS = new ExtractTextPlugin('style.css');

let config = {};

/*
 Add entry point(s)
 */
if(NODE_ENV === "production") {
  config.entry = {
    app: [
      "./src/client/index.js"
    ]
  };
}
else {
  config.entry = {
    app: [
      "webpack-dev-server/client?http://localhost:5001/",
      'webpack/hot/dev-server',
      'react-hot-loader/patch',
      "./src/client/index.js"
    ]
  };
}

/*
 Add output path
 */
config.output = {
  path: path.resolve(__dirname, "public"),
  publicPath: "/",
  filename: "bundle.js"
};

/*
 For Development add 'devtool' and 'devServer'
 */
if(NODE_ENV === "development") {
  config.devTool = 'inline-source-map';
  config.devServer = {
    inline: true,
    port: 5001,
    contentBase: "./public"
  };

  config.resolve = {
    alias: {
      'redux-devtools': path.join(__dirname, 'node_modules', 'redux-devtools'),
      'react'         : path.join(__dirname, 'node_modules', 'react')
    }
  };
  config.resolveLoader = {
    'fallback': path.join(__dirname, 'node_modules')
  }
}


/*
 Add Module Loaders according to development or production requirement.
 */
config.module = {};
config.module.loaders = [];


//Add 'babel-loader' for converting JavaScript from ES6 to ES5.
//It is required in both "development" and "production" environment.
//explain presets and plugins.
config.module.loaders.push({
  test    : /(\.js|\.jsx)$/,
  exclude : /(node_modules)/,
  loader  : 'babel-loader',
  query   : {
    presets: ['es2015', 'stage-0', 'react'],
    plugins : ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
  }
});

if(NODE_ENV === "development") {
  config.module.loaders.push({
    test: /\.js$/,
    loader: 'babel',
    include: path.join(__dirname, 'node_modules', 'redux-devtools', 'src')
  });
}

if(NODE_ENV === "development") {
  config.module.loaders.push({test: /\.css$/,  loaders: ["style", "css"]});
  config.module.loaders.push({test: /\.scss$/, loaders: ["style", "css", "sass"]});
}
else {
  config.module.loaders.push({test: /\.css$/i,  loader: extractCSS.extract(['css'])});
  config.module.loaders.push({test: /\.scss$/i, loader: extractCSS.extract(['css','sass'])});
}

//Add loaders for Url
config.module.loaders.push({
  test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
  loader: "url-loader?limit=10000&mimetype=application/font-woff"
});

//Add loaders for Files
config.module.loaders.push({
  test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
  loader: "file-loader"
});


/*
 Add plugins according to requirement.
 */
config.plugins = [];

//Environment variables.
if(NODE_ENV === "production") {
  config.plugins.push(new webpack.EnvironmentPlugin(["NODE_ENV"]));
}
else {
  config.plugins.push(new webpack.EnvironmentPlugin(["NODE_ENV", "DEV_ENV"]));
}

if(NODE_ENV === "development") {
  //It should be added along-side with React Hot Loader module.
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}
else {
  //No Error plugin will eliminate all the errors that occurs while building 'bundle.js'
  config.plugins.push(new webpack.NoErrorsPlugin());
  config.plugins.push(extractCSS);

  //Uglify will minimize/compress output file i.e. 'bundle.js'.
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress : { warnings: false },
      output   : { comments: false },
      sourceMap: true
    })
  );
}

module.exports = config;
