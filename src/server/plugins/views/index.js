
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';

import routes from '../../../client/routes/index';
import NotFoundPage from '../../../client/routes/ErrorPage';
import configureStore from '../../../client/store/configureStore';

const register = (server, options, next) => {
  server.route([
    {
      method: 'GET',
      path: '/{url*}',
      handler: (request, reply) => {
        match({ routes, location: request.path }, (err, redirectLocation, renderProps) => {
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
          let app = '';
          const { isSignedIn, id, token } = request.state;

          let initialState = configureStore().getState();
          let store = configureStore(initialState);

          if (isSignedIn === 'true') {
            const { user } = initialState;
            store = configureStore({
              ...initialState,
              user: {
                ...user,
                isSignedIn: true,
                id: parseInt(id, 10),
                token,
              },
            });
          }

          if (renderProps) {
            // if the current route matched we have renderProps
            app = renderToString(
              <Provider store={store}>
                <RouterContext {...renderProps} />
              </Provider>,
            );
          }
          else {
            // otherwise we can render a 404 page
            app = renderToString(<NotFoundPage />);
          }

          initialState = JSON.stringify(store.getState());
          return reply.view('index', {
            title: 'Mayash',
            description: 'Mayash',
            app,
            initialState,
          });
        });
      },
    },

    { method: 'GET', path: '/public/{url*}', handler: { directory: { path: 'public' } } },

    { method: 'GET', path: '/favicon.ico', handler: (request, reply) => reply.file('./favicon.ico') },
  ]);

  next();
};

register.attributes = {
  pkg: {
    name: 'View',
    version: '0.0.1',
    description: 'This plugin contains all the features related to React server side rendering.',
  },
};

export default register;
