
import React from 'react';
import { Route, IndexRoute } from 'react-router';

const IsClient = typeof document === 'object';

if (IsClient) {
  require('./Routes.scss');
}

const routes = (
  <Route
    path="/" getComponent={(nextState, callback) => {
      if (IsClient) {
        require.ensure([], (require) => {
          callback(null, require('../Layout').default);
        });
      }
      else {
        callback(null, require('../Layout').default);
      }
    }}
  >
    <IndexRoute
      getComponent={(nextState, callback) => {
        if (IsClient) {
          require.ensure([], (require) => {
            callback(null, require('../IndexPage').default);
          });
        }
        else {
          callback(null, require('../IndexPage').default);
        }
      }}
    />

    <Route
      path="articles/:articleId" getComponent={(nextState, callback) => {
        if (IsClient) {
          require.ensure([], (require) => {
            callback(null, require('../Article').default);
          });
        }
        else {
          callback(null, require('../Article').default);
        }
      }}
    />

    <Route
      path="courses/:courseId" getComponent={(nextState, callback) => {
        if (IsClient) {
          require.ensure([], (require) => {
            callback(null, require('../Course').default);
          });
        }
        else {
          callback(null, require('../Course').default);
        }
      }}
    />

    <Route
      path=":username" getComponent={(nextState, callback) => {
        if (IsClient) {
          require.ensure([], (require) => {
            callback(null, require('../Elements').default);
          });
        }
        else {
          callback(null, require('../Elements').default);
        }
      }}
    />
    <Route
      path=":username/classroom" getComponent={(nextState, callback) => {
        if (IsClient) {
          require.ensure([], (require) => {
            callback(null, require('../Classroom').default);
          });
        }
        else {
          callback(null, require('../Classroom').default);
        }
      }}
    />

    <Route
      path="*" getComponent={(nextState, callback) => {
        if (IsClient) {
          require.ensure([], (require) => {
            callback(null, require('../Error').default);
          });
        }
        else {
          callback(null, require('../Error').default);
        }
      }}
    />
  </Route>
);

export default routes;
