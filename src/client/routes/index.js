
import React from 'react';
import { Route, IndexRoute } from 'react-router';

const IsClient = typeof window === 'undefined';

if (IsClient) {
  require('./index.scss');
}

const routes = (
  <Route
    path="/" getComponent={(nextState, callback) => {
      if (IsClient) {
        callback(null, require('./Layout/index').default);
      }
      else {
        require.ensure([], (require) => {
          callback(null, require('./Layout/index').default);
        });
      }
    }}
  >
    <IndexRoute
      getComponent={(nextState, callback) => {
        if (IsClient) {
          require.ensure([], (require) => {
            callback(null, require('./IndexPage').default);
          });
        }
        else {
          callback(null, require('./IndexPage').default);
        }
      }}
    />

    <Route
      path="articles/:articleId" getComponent={(nextState, callback) => {
        if (IsClient) {
          callback(null, require('./ArticleViewPage').default);
        }
        else {
          require.ensure([], (require) => {
            callback(null, require('./ArticleViewPage').default);
          });
        }
      }}
    />

    <Route
      path="courses/:courseId" getComponent={(nextState, callback) => {
        if (IsClient) {
          callback(null, require('./CourseViewPage').default);
        }
        else {
          require.ensure([], (require) => {
            callback(null, require('./CourseViewPage').default);
          });
        }
      }}
    />

    <Route
      path=":username" getComponent={(nextState, callback) => {
        if (IsClient) {
          callback(null, require('./ElementPage').default);
        }
        else {
          require.ensure([], (require) => {
            callback(null, require('./ElementPage').default);
          });
        }
      }}
    />
    <Route
      path=":username/classroom" getComponent={(nextState, callback) => {
        if (IsClient) {
          callback(null, require('./ClassroomPage').default);
        }
        else {
          require.ensure([], (require) => {
            callback(null, require('./ClassroomPage').default);
          });
        }
      }}
    />

    <Route
      path="*" getComponent={(nextState, callback) => {
        if (IsClient) {
          callback(null, require('./ErrorPage').default);
        }
        else {
          require.ensure([], (require) => {
            callback(null, require('./ErrorPage').default);
          });
        }
      }}
    />
  </Route>
);

export default routes;
