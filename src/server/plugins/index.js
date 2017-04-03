/**
 * This file exports an array of plugins which have to be registered for server.
 * Plugins may be build-in or made by our developers.
 */
import Inert from 'inert';
import Vision from 'vision';
import Good from 'good';
import HapiAuthJwt2 from 'hapi-auth-jwt2';

import mayashAuth from '@hbarve1/mayash-auth';
import mayashAPI from '@hbarve1/mayash-api';
import mayashViews from '@hbarve1/mayash-views';

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

plugins.push({
  register: mayashAuth,
  options: {},
});

plugins.push({
  register: mayashAPI,
  routes: {
    prefix: `/api/${require('@hbarve1/mayash-api/package.json').version}`,
  },
  options: {},
});

plugins.push({
  register: mayashViews,
  options: {},
});

export default plugins;
