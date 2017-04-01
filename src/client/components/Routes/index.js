
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
      path="introduction" getComponent={(nextState, callback) => {
        require.ensure([], (require) => {
          callback(null, require('../Introduction').default);
        });
      }}
    />
    <Route
      path="motivation" getComponent={(nextState, callback) => {
        require.ensure([], (require) => {
          callback(null, require('../Motivation').default);
        });
      }}
    />
    <Route
      path="about-us" getComponent={(nextState, callback) => {
        require.ensure([], (require) => {
          callback(null, require('../AboutUs').default);
        });
      }}
    />
    <Route
      path="product-and-services" getComponent={(nextState, callback) => {
        require.ensure([], (require) => {
          callback(null, require('../ProductAndServices').default);
        });
      }}
    />
    <Route
      path="team" getComponent={(nextState, callback) => {
        require.ensure([], (require) => {
          callback(null, require('../Team').default);
        });
      }}
    />
    <Route
      path="sponsors" getComponent={(nextState, callback) => {
        require.ensure([], (require) => {
          callback(null, require('../Sponsors').default);
        });
      }}
    />
    <Route
      path="customer-reviews" getComponent={(nextState, callback) => {
        require.ensure([], (require) => {
          callback(null, require('../CustomerReviews').default);
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
      path="feedback" getComponent={(nextState, callback) => {
        require.ensure([], (require) => {
          callback(null, require('../Feedback').default);
        });
      }}
    />

    <Route
      path="articles/:articleId" getComponent={(nextState, callback) => {
        require.ensure([], (require) => {
          callback(null, require('../Article').default);
        });
      }}
    />

    <Route
      path="courses/:courseId" getComponent={(nextState, callback) => {
        require.ensure([], (require) => {
          callback(null, require('../Course').default);
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
          callback(null, require('../Classroom').default);
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
