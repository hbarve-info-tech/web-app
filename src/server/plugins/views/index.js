'use strict';
let template = ({
  title       = 'Mayash',
  description = 'Mayash is a group of IITians committed for providing world class education at your door-step.',
  keywords    = ['Mayash', 'Mayash education', 'IITians committed for providing world class education.']
} = {}) => {
  return (`<!DOCTYPE html>
<html lang="en">
<head>
  <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
  <script>
    (adsbygoogle = window.adsbygoogle || []).push({
      google_ad_client: "ca-pub-7913833609955757",
      enable_page_level_ads: true
    });
  </script>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="keywords"    content="${keywords.toString()}">

  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">

  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="/style.css">
</head>
<body class="skin-purple layout-top-nav">
  <div id="app">
    <div id="loading">
      Loading...
    </div>
  </div>
  <script src="/bundle.js" ></script>
  <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  
    ga('create', 'UA-78687441-2', 'auto');
    ga('send', 'pageview');
  </script>
</body>
</html>`);
};

export const register = (server, options, next) => {

  server.route([
    {method: 'GET', path:'/',                     handler: (request, reply) => reply(template())},
    {method: 'GET', path:'/{username}',           handler: (request, reply) => reply(template())},
    {method: 'GET', path:'/{username}/classroom', handler: (request, reply) => reply(template())},

    {method: 'GET', path:'/articles/{articleId}',      handler: (request, reply) => reply(template())},
    {method: 'GET', path:'/articles/{articleId}/edit', handler: (request, reply) => reply(template())},

    {method: 'GET', path:'/courses/{courseId}',      handler: (request, reply) => reply(template())},
    {method: 'GET', path:'/courses/{courseId}/edit', handler: (request, reply) => reply(template())},

    // {method: 'GET', path:'/{url*}',               handler: (request, reply) => reply(template())},

    {method: 'GET', path:'/public/{url*}',       handler: {directory: {path: 'public'}}},

    {method: 'GET', path:'/bundle.js',           handler: (request, reply) => reply.file('./public/bundle.js')},
    {method: 'GET', path:'/style.css',           handler: (request, reply) => reply.file('./public/style.css')},
    {method: 'GET', path:'/favicon.ico',         handler: (request, reply) => reply.file('./favicon.ico')}
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