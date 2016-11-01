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
  
      <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
      <!--<link rel="stylesheet" href="/style.css">-->
    </head>
    <body class="skin-purple layout-top-nav">
      <div id="app">
        <div id="loading">
          Loading...
        </div>
      </div>
      <script src="/bundle.js" ></script>
      <script>
        (function(i,s,o,g,r,a,m){
          i['GoogleAnalyticsObject']=r;
          i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];
          a.async=1;
          a.src=g;
          m.parentNode.insertBefore(a,m);
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  
        ga('create', 'UA-78687441-1', 'auto');
        ga('send', 'pageview');
      </script>
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