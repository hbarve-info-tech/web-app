/**
 * This file exports an array of plugins which have to be registered for server.
 * Plugins may be build-in or made by our developers.
 */
'use strict';
const NODE_ENV = process.env.NODE_ENV;
const DEV_ENV  = process.env.DEV_ENV;

const plugins = [];

//For serving Static file/folder to client.
plugins.push({
  register: require('inert'),
  options: {}
});

plugins.push({
  register : require('good'),
  options : {
    ops: {
      interval: 1000
    },
    reporters: {
      console: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{ log: '*', response: '*' }]
      }, {
        module: 'good-console'
      }, 'stdout'],
      file: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{ ops: '*' }]
      }, {
        module: 'good-squeeze',
        name: 'SafeJson'
      }, {
        module: 'good-file',
        args: ['./test/fixtures/awesome_log']
      }],
      http: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{ error: '*' }]
      }, {
        module: 'good-http',
        args: ['http://prod.logs:3000', {
          wreck: {
            headers: { 'x-api-key': 12345 }
          }
        }]
      }]
    }
  }
});


export default plugins;