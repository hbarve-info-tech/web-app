/**
 * This file exports an array of plugins which have to be registered for server.
 * Plugins may be build-in or made by our developers.
 */
import Inert from 'inert';
import Vision from 'vision';
import Good from 'good';
import HapiAuthJwt2 from 'hapi-auth-jwt2';

import MayashTraffic from '../../lib/mayash-traffic';

import MayashAuth from '../../lib/mayash-auth';

import MayashViews from '../../lib/mayash-views';

import MayashApi from '../../lib/mayash-api';

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
  register: MayashTraffic,
  options: {},
});

plugins.push({
  register: MayashAuth,
  options: {},
});

plugins.push({
  register: MayashApi,
  options: {},
});

plugins.push({
  register: MayashViews,
  options: {},
});

export default plugins;
