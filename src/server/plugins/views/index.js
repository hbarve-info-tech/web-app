'use strict';
let template = () => {
  return (`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>Mayash</title>
      <!-- Tell the browser to be responsive to screen width -->
      <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  
      <link rel="stylesheet" href="/node_modules/font-awesome/css/font-awesome.min.css">
      <!--<link rel="stylesheet" href="/style.css">-->
    </head>
    <body class="skin-purple layout-top-nav">
      <div id="app">
        <div id="loading">
          Loading...
        </div>
      </div>
      <script src="/bundle.js" ></script>
    </body>
    </html>`);
};

export const register = (server, options, next) => {

  server.route([
    {method: 'GET', path:'/{url*}',              handler: (request, reply) => reply(template())},

    {method: 'GET', path:'/node_modules/{url*}', handler: {directory: {path: 'node_modules'}}},
    {method: 'GET', path:'/public/{url*}',       handler: {directory: {path: 'public'}}},

    {method: 'GET', path:'/bundle.js',           handler: (request, reply) => reply.file('./public/bundle.js')},
    {method: 'GET', path:'/style.css',           handler: (request, reply) => reply.file('./public/style.css')},
    {method: 'GET', path:'/favicon.ico',         handler: (request, reply) => reply.file('./public/favicon.ico')}
  ]);

  next();
};

register.attributes = {
  pkg : {
    "name": "View",
    "version": "0.0.1",
    "description": "This plugin contains all the features related to React server side rendering."
  }
};