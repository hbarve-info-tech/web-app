
import Boom from 'boom';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';

import actions from '../../../client/actions';

import ReactRoutes from '../../../client/components/Routes';
import NotFoundPage from '../../../client/components/Error';
import configureStore from '../../../client/store/configureStore';

const { NODE_ENV } = process.env;

export default {
  handler: (request, reply) => match({
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
      title: 'Welcome to Mayash',
      description: ['Mayash is a learning and sharing platform, where all the educational ',
        'institute, teachers, professional, students can learn and share their knowledge. Here we ',
        'are covering all the fields of education with freedom of language.'].join(),
      keywords: [
        'mayash',
        'mayash.com',
        'mayash.in',
        'mayash.xyz',
        'mayash.edu',
        'mayash education',
        'online classroom',
        'online courses',
      ].join(),
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

    const { isSignedIn, id, username, token } = request.state;

    if (isSignedIn !== 'true') {
      context.initialState = JSON.stringify(initialState);
      context.app = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>,
      );
      return reply.view('index', context);
    }

    const { elements } = initialState;
    store = configureStore({
      ...initialState,
      elements: [
        {
          ...elements[0],
          isSignedIn: true,
          id: parseInt(id, 10),
          username,
          token,
        },
      ],
    });

    store.dispatch(actions.getElement({ id: parseInt(id, 10), token }));

    const unsubscribe = store.subscribe(() => {
      unsubscribe();

      context.app = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );

      context.initialState = JSON.stringify(store.getState());

      return reply.view('index', context);
    });
  }),
};
