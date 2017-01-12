'use strict';
const { NODE_ENV } = process.env;

import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

import App from "../../../client/App";
import routes from '../../../client/routes';
import NotFoundPage from '../../../client/components/NotFoundPage';


const googleAds = `<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
  <script>
    (adsbygoogle = window.adsbygoogle || []).push({
      google_ad_client: "ca-pub-7913833609955757",
      enable_page_level_ads: true
    });
  </script>`;

const googleAnalytic = `<script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  
    ga('create', 'UA-78687441-2', 'auto');
    ga('send', 'pageview');
  </script>`;


let template = ({
  title       = 'Mayash',
  description = 'Mayash is a group of IITians committed for providing world class education at your door-step.',
  keywords    = ['Mayash', 'Mayash education', 'IITians committed for providing world class education.'],
  body
} = {}) => {
  return (`<!DOCTYPE html>
<html lang="en">
<head>
  ${NODE_ENV !== 'development' ? googleAds : ``}
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="keywords"    content="${keywords.toString()}">

  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">

  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="/public/style.css">
</head>
<body class="skin-purple layout-top-nav">
  <div id="app">${body}</div>
  <script src="/public/bundle.js" ></script>
  ${NODE_ENV !== 'development' ? googleAnalytic : ''}
</body>
</html>`);
};

export const register = (server, options, next) => {

  server.route([
    {
      method : 'GET',
      path   :'/{url*}',
      handler: (request, reply) => {
        match( { routes, location: request.path}, (err, redirectLocation, renderProps) => {

          // in case of error display the error message
          if (err) {
            // return res.status(500).send(err.message);
            console.error(err);
          }

          // in case of redirect propagate the redirect to the browser
          if (redirectLocation) {
            // return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
            console.log(redirectLocation);
          }

          // generate the React markup for the current route
          let markup;
          if (renderProps) {
            // if the current route matched we have renderProps
            markup = renderToString(<RouterContext {...renderProps}/>);
          } else {
            // otherwise we can render a 404 page
            markup = renderToString(<NotFoundPage/>);
            // res.status(404);
          }

          // render the index template with the embedded React markup

          return reply.view('index', {
            title  : 'Mayash',
            app    : markup
          });
        });
      }
    },

    {method: 'GET', path:'/public/{url*}',       handler: {directory: {path: 'public'}}},

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