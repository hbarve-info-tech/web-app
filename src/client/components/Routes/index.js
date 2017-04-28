
import React from 'react';
import { Route, IndexRoute } from 'react-router';

// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

const routes = (
  <Route
    path="/" getComponent={(nextState, callback) => {
      require.ensure([], (require) => {
        callback(null, require('../Layout').default);
      });
    }}
  >
    <IndexRoute
      getComponent={(nextState, callback) => {
        require.ensure([], (require) => {
          callback(null, require('../IndexPage').default);
        });
      }}
    />

    <Route
      path="signin" getComponent={(nextState, callback) => {
        require.ensure([], (require) => {
          callback(null, require('../SignInPage').default);
        });
      }}
    />

    <Route
      path="contact-us" getComponent={(nextState, callback) => {
        require.ensure([], (require) => {
          callback(null, require('../ContactUs').default);
        });
      }}
    />

    <Route
      path="posts/:postId" getComponent={(nextState, callback) => {
        require.ensure([], (require) => {
          callback(null, require('../PostPage').default);
        });
      }}
    />

    <Route
      path="courses/:courseId" getComponent={(nextState, callback) => {
        require.ensure([], (require) => {
          callback(null, require('../CoursePage').default);
        });
      }}
    />

    <Route
      path=":username" getComponent={(nextState, callback) => {
        require.ensure([], (require) => {
          callback(null, require('../Elements').default);
        });
      }}
    />
    <Route
      path=":username/classroom" getComponent={(nextState, callback) => {
        require.ensure([], (require) => {
          callback(null, require('../ClassroomPage').default);
        });
      }}
    />

    <Route
      path="*" getComponent={(nextState, callback) => {
        require.ensure([], (require) => {
          callback(null, require('../Error').default);
        });
      }}
    />
  </Route>
);

export default routes;
