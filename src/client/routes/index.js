
import React from 'react';
import { Route, IndexRoute } from 'react-router';

const IsServer = typeof window === 'undefined';

if (!IsServer) {
  require('./index.scss');
}

const routes = (
  <Route
    path="/" getComponent={(nextState, callback) => {
      if (IsServer) {
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
        if (IsServer) {
          callback(null, require('./IndexPage').default);
        }
        else {
          require.ensure([], (require) => {
            callback(null, require('./IndexPage').default);
          });
        }
      }}
    />

    <Route
      path="about-us" getComponent={(nextState, callback) => {
        if (IsServer) {
          callback(null, require('./AboutUs').default);
        }
        else {
          require.ensure([], (require) => {
            callback(null, require('./AboutUs').default);
          });
        }
      }}
    />
    <Route
      path="contact-us" getComponent={(nextState, callback) => {
        if (IsServer) {
          callback(null, require('./ContactUs').default);
        }
        else {
          require.ensure([], (require) => {
            callback(null, require('./ContactUs').default);
          });
        }
      }}
    />

    <Route
      path="team" getComponent={(nextState, callback) => {
        if (IsServer) {
          callback(null, require('./Team').default);
        }
        else {
          require.ensure([], (require) => {
            callback(null, require('./Team').default);
          });
        }
      }}
    />
    <Route
      path="partners" getComponent={(nextState, callback) => {
        if (IsServer) {
          callback(null, require('./Partners').default);
        }
        else {
          require.ensure([], (require) => {
            callback(null, require('./Partners').default);
          });
        }
      }}
    />

    <Route
      path="products" getComponent={(nextState, callback) => {
        if (IsServer) {
          callback(null, require('./Products').default);
        }
        else {
          require.ensure([], (require) => {
            callback(null, require('./Products').default);
          });
        }
      }}
    />
    <Route
      path="feedback" getComponent={(nextState, callback) => {
        if (IsServer) {
          callback(null, require('./Feedback').default);
        }
        else {
          require.ensure([], (require) => {
            callback(null, require('./Feedback').default);
          });
        }
      }}
    />

    <Route
      path="articles/:articleId" getComponent={(nextState, callback) => {
        if (IsServer) {
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
      path="articles/:articleId/edit" getComponent={(nextState, callback) => {
        if (IsServer) {
          callback(null, require('./ArticleEditPage').default);
        }
        else {
          require.ensure([], (require) => {
            callback(null, require('./ArticleEditPage').default);
          });
        }
      }}
    />

    <Route
      path="courses/:courseId" getComponent={(nextState, callback) => {
        if (IsServer) {
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
      path="courses/:courseId/edit" getComponent={(nextState, callback) => {
        if (IsServer) {
          callback(null, require('./CourseEditPage').default);
        }
        else {
          require.ensure([], (require) => {
            callback(null, require('./CourseEditPage').default);
          });
        }
      }}
    />

    <Route
      path=":username" getComponent={(nextState, callback) => {
        if (IsServer) {
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
        if (IsServer) {
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
        if (IsServer) {
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
