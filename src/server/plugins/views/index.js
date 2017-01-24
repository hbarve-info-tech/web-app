
import Boom from 'boom';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';

import actions from '../../../client/actions';

import routes from '../../../client/routes/index';
import NotFoundPage from '../../../client/routes/ErrorPage';
import configureStore from '../../../client/store/configureStore';

const HomeHandler = (request, reply) => {
  match({
    routes,
    location: request.path,
  }, (err, redirectLocation, renderProps) => {
    // in case of error display the error message
    if (err) {
      console.log(err);
      return reply(Boom.badImplementation());
    }

    // in case of redirect propagate the redirect to the browser
    if (redirectLocation) {
      // return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      return reply.redirect(redirectLocation.pathname);
    }

    // generate the React markup for the current route
    const context = {
      title: 'Mayash',
      description: 'Transforming Education.',
      app: '',
      initialState: '',
    };
    if (!renderProps) {
      context.app = renderToString(<NotFoundPage />);
      return reply.view('index', context);
    }

    let store = configureStore();
    const initialState = store.getState();

    const { isSignedIn, id, token } = request.state;

    if (isSignedIn !== 'true') {
      context.initialState = JSON.stringify(initialState);
      context.app = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>,
      );
      return reply.view('index', context);
    }

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

    store.dispatch(actions.fetchUser({ id: parseInt(id, 10), token }));

    let count = 0;
    const unsubscribe = store.subscribe(() => {
      count += 1;

      context.app = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>,
      );

      context.initialState = JSON.stringify(store.getState());

      if (count === 2) {
        unsubscribe();
        return reply.view('index', context);
      }
    });
  });
};

const ArticleHandler = (request, reply) => {
  if (request.path !== request.path.toLowerCase()) {
    return reply.redirect(request.path.toLowerCase());
  }

  match({
    routes,
    location: request.path
  }, (err, redirectLocation, renderProps) => {
    // in case of error display the error message
    if (err) {
      console.log(err);
      return reply(Boom.badImplementation());
    }

    // in case of redirect propagate the redirect to the browser
    if (redirectLocation) {
      // return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      return reply.redirect(redirectLocation.pathname);
    }

    // generate the React markup for the current route
    const context = {
      title: 'Mayash',
      description: 'Transforming Education.',
      app: '',
      initialState: '',
    };
    if (!renderProps) {
      context.app = renderToString(<NotFoundPage />);
      return reply.view('index', context);
    }

    const { isSignedIn, id, token } = request.state;

    let store = configureStore();
    const initialState = store.getState();

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
    const { articleId } = request.params;

    // store.dispatch(actions.fetchUser({ id, token }));
    store.dispatch(actions.fetchArticle({ articleId }));

    const unsubscribe = store.subscribe(() => {
      context.app = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>,
      );

      context.initialState = JSON.stringify(store.getState());
      unsubscribe();
      return reply.view('index', context);
    });
  });
};

const CourseHandler = (request, reply) => {
  if (request.path !== request.path.toLowerCase()) {
    return reply.redirect(request.path.toLowerCase());
  }

  match({
    routes,
    location: request.path,
  }, (err, redirectLocation, renderProps) => {
    // in case of error display the error message
    if (err) {
      console.log(err);
      return reply(Boom.badImplementation());
    }

    // in case of redirect propagate the redirect to the browser
    if (redirectLocation) {
      // return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      return reply.redirect(redirectLocation.pathname);
    }

    // generate the React markup for the current route
    const context = {
      title: 'Mayash',
      description: 'Transforming Education.',
      app: '',
      initialState: '',
    };
    if (!renderProps) {
      context.app = renderToString(<NotFoundPage />);
      return reply.view('index', context);
    }

    let store = configureStore();
    const initialState = store.getState();

    const { isSignedIn, id, token } = request.state;

    if (isSignedIn !== 'true') {
      return reply.redirect('/');
    }

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

    const { courseId } = request.params;

    store.dispatch(actions.fetchCourse({ courseId, token }));

    const unsubscribe = store.subscribe(() => {
      context.app = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>,
      );

      context.initialState = JSON.stringify(store.getState());
      unsubscribe();
      return reply.view('index', context);
    });
  });
};

const ElementHandler = (request, reply) => {
  if (request.path !== request.path.toLowerCase()) {
    return reply.redirect(request.path.toLowerCase());
  }

  match({
    routes,
    location: request.path,
  }, (err, redirectLocation, renderProps) => {
    // in case of error display the error message
    if (err) {
      console.log(err);
      return reply(Boom.badImplementation());
    }

    // in case of redirect propagate the redirect to the browser
    if (redirectLocation) {
      // return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      return reply.redirect(redirectLocation.pathname);
    }

    // generate the React markup for the current route
    const context = {
      title: 'Mayash',
      description: 'Transforming Education.',
      app: '',
      initialState: '',
    };
    if (!renderProps) {
      context.app = renderToString(<NotFoundPage />);
      return reply.view('index', context);
    }

    let store = configureStore();
    const initialState = store.getState();

    const { isSignedIn, id, token } = request.state;

    if (isSignedIn !== 'true') {
      return reply.redirect('/');
    }

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

    const { username } = request.params;

    store.dispatch(actions.fetchElement({ username, token }));

    const unsubscribe = store.subscribe(() => {
      context.app = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>,
      );

      context.initialState = JSON.stringify(store.getState());
      unsubscribe();
      return reply.view('index', context);
    });
  });
};

const ClassroomHandler = (request, reply) => {
  if (request.path !== request.path.toLowerCase()) {
    return reply.redirect(request.path.toLowerCase());
  }

  match({
    routes,
    location: request.path,
  }, (err, redirectLocation, renderProps) => {
    // in case of error display the error message
    if (err) {
      console.log(err);
      return reply(Boom.badImplementation());
    }

    // in case of redirect propagate the redirect to the browser
    if (redirectLocation) {
      // return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      return reply.redirect(redirectLocation.pathname);
    }

    // generate the React markup for the current route
    const context = {
      title: 'Mayash',
      description: 'Transforming Education.',
      app: '',
      initialState: '',
    };
    if (!renderProps) {
      context.app = renderToString(<NotFoundPage />);
      return reply.view('index', context);
    }

    let store = configureStore();
    const initialState = store.getState();

    const { isSignedIn, id, token } = request.state;

    if (isSignedIn !== 'true') {
      return reply.redirect('/');
    }

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

    const { username } = request.params;

    store.dispatch(actions.fetchElement({ username, token }));

    const unsubscribe = store.subscribe(() => {
      context.app = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>,
      );

      context.initialState = JSON.stringify(store.getState());
      unsubscribe();
      return reply.view('index', context);
    });
  });
};

const handler = (request, reply) => {
  if (request.path !== request.path.toLowerCase()) {
    return reply.redirect(request.path.toLowerCase());
  }

  match({
    routes,
    location: request.path,
  }, (err, redirectLocation, renderProps) => {
    // in case of error display the error message
    if (err) {
      console.log(err);
      return reply(Boom.badImplementation());
    }

    // in case of redirect propagate the redirect to the browser
    if (redirectLocation) {
      // return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      return reply.redirect(redirectLocation.pathname);
    }

    // generate the React markup for the current route
    const context = {
      title: 'Mayash',
      description: 'Transforming Education.',
      app: '',
      initialState: '',
    };
    if (!renderProps) {
      context.app = renderToString(<NotFoundPage />);
      return reply.view('index', context);
    }

    let store = configureStore();
    const initialState = store.getState();

    const { isSignedIn, id, token } = request.state;

    if (isSignedIn !== 'true') {
      context.initialState = JSON.stringify(initialState);
      context.app = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>,
      );
      return reply.view('index', context);
    }

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

    context.initialState = JSON.stringify(store.getState());
    context.app = renderToString(
      <Provider store={store}>
        <RouterContext {...renderProps} />
      </Provider>,
    );
    return reply.view('index', context);
  });
};

const register = (server, options, next) => {
  server.route([
    { method: 'GET', path: '/', handler: HomeHandler },

    { method: 'GET', path: '/articles/{articleId}', handler: ArticleHandler },

    { method: 'GET', path: '/courses/{courseId}', handler: CourseHandler },

    { method: 'GET', path: '/{username}', handler: ElementHandler },

    { method: 'GET', path: '/{username}/classroom', handler: ClassroomHandler },

    { method: 'GET', path: '/{url*}', handler },

    { method: 'GET', path: '/public/{url*}', handler: { directory: { path: 'public' } } },

    { method: 'GET', path: '/favicon.ico', handler: (request, reply) => reply.file('./favicon.ico') },
  ]);

  next();
};

register.attributes = {
  pkg: {
    name: 'View',
    version: '2.0.0',
    description: 'This plugin contains all the features related to React server side rendering.',
  },
};

export default register;
