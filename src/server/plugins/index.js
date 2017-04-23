/**
 * This file exports an array of plugins which have to be registered for server.
 * Plugins may be build-in or made by our developers.
 */
import Inert from 'inert';
import Vision from 'vision';
import Good from 'good';
import HapiAuthJwt2 from 'hapi-auth-jwt2';
import Traffic from './traffic';
import Auth from './auth';
import Views from './views';
import User from './user';
import Elements from './elements';
import Posts from './posts';
import Articles from './articles';
import Courses from './courses';
import Classroom from './classrooms';
import Images from './images';

const { NODE_ENV } = process.env;

const plugins = [];

// For serving Static file/folder to client.
plugins.push({
  register: Inert,
  options: {},
});

plugins.push({
  register: Vision,
  options: {},
});

plugins.push({
  register: Good,
  options: {
    ops: {
      interval: 1000,
    },
    reporters: {
      console: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{ log: '*', response: '*' }],
      }, {
        module: 'good-console',
      }, 'stdout'],
      file: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{ ops: '*' }],
      }, {
        module: 'good-squeeze',
        name: 'SafeJson',
      }, {
        module: 'good-file',
        args: ['./test/fixtures/awesome_log'],
      }],
      http: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{ error: '*' }],
      }, {
        module: 'good-http',
        args: ['http://prod.logs:3000', {
          wreck: {
            headers: { 'x-api-key': 12345 },
          },
        }],
      }],
    },
  },
});

plugins.push({
  register: HapiAuthJwt2,
  options: {},
});

if (NODE_ENV === 'development') {
  plugins.push({
    register: require('tv'),
    options: {
      endpoint: '/debug',
    },
  });
}

plugins.push({
  register: Traffic,
  options: {},
});

plugins.push({
  register: Auth,
  options: {},
});

plugins.push({
  register: Views,
  options: {},
});

// plugins.push({
//   register: User,
//   options: {},
// });

plugins.push({
  register: Elements,
  options: {},
});

plugins.push({
  register: Posts,
  options: {},
});
//
// plugins.push({
//   register: Articles,
//   options: {},
// });
//
plugins.push({
  register: Courses,
  options: {},
});
//
// plugins.push({
//   register: Classroom,
//   options: {},
// });
//
// plugins.push({
//   register: Images,
//   options: {},
// });

export default plugins;
