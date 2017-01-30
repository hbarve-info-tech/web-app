
import Boom from 'boom';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';

import ReactRoutes from '../../../client/components/Routes';
import NotFoundPage from '../../../client/components/Error';
import configureStore from '../../../client/store/configureStore';

const { NODE_ENV } = process.env;

export default {
  handler: (request, reply) => {
    if (request.path !== request.path.toLowerCase()) {
      return reply.redirect(request.path.toLowerCase());
    }

    match({
      routes: ReactRoutes,
      location: request.path,
    }, (err, redirectLocation, renderProps) => {
      if (err) {
        console.log(err);
        return reply(Boom.badImplementation());
      }

      if (redirectLocation) {
        return reply.redirect(redirectLocation.pathname);
      }

      const context = {
        title: 'Mayash',
        description: 'Transforming Education.',
        keywords: 'education, courses',
        imageUrl: 'https://storage.googleapis.com/mayash/website/mayash-title.png',
        type: 'website',
        url: request.path,
        site_name: 'Transforming Education',
        app: '',
        initialState: '',
        PRODUCTION: NODE_ENV === 'production',
      };

      if (!renderProps) {
        context.app = renderToString(<NotFoundPage />);
        return reply.view('index', context);
      }

      let store = configureStore();
      const initialState = store.getState();
      context.initialState = JSON.stringify(initialState);

      const { isSignedIn, id, token } = request.state;

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
      context.initialState = JSON.stringify(store.getState());

      context.app = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>,
      );

      return reply.view('index', context);
    });
  },
};
