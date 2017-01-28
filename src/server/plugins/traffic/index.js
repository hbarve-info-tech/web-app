/* eslint no-unused-vars: 1 */

import Boom from 'boom';

import { Token } from '../../config';

const IP = {};
const visitor = {};
const userRead = {};
const userWrite = {};


const trafficCheckScheme = (server, options) => ({
  authenticate(request, reply) {
    const minute = Math.floor(Date.now() / 120000);

    if (!IP[minute]) {
      IP[minute] = {};
      IP[minute][request.info.remoteAddress] = 1;
    }
    else if (!IP[minute][request.info.remoteAddress]) {
      IP[minute][request.info.remoteAddress] = 1;
    }
    else {
      IP[minute][request.info.remoteAddress] += 1;
    }

    if (IP[minute] && IP[minute][request.info.remoteAddress] > 20) {
      return reply(Boom.tooManyRequests('you have exceeded your request limit, try after 2 minutes.'));
    }

    return reply.continue({ credentials: {} });
  },
});

const visitorScheme = (server, options) => ({
  authenticate(request, reply) {
    const minute = Math.floor(Date.now() / 120000);

    if (!visitor[minute]) {
      visitor[minute] = {};
      visitor[minute][request.info.remoteAddress] = 1;
    }
    else if (!visitor[minute][request.info.remoteAddress]) {
      visitor[minute][request.info.remoteAddress] = 1;
    }
    else {
      visitor[minute][request.info.remoteAddress] += 1;
    }

    if (visitor[minute] && visitor[minute][request.info.remoteAddress] > 20) {
      return reply(Boom.tooManyRequests('you have exceeded your request limit, try after 2 minutes.'));
    }

    return reply.continue({ credentials: {} });
  },
});

const register = (server, options, next) => {
  // This strategy will check the limit of certain IP for 'visitors', who are not logged in.
  server.auth.scheme('trafficCheckScheme', trafficCheckScheme);
  server.auth.strategy('trafficCheck', 'trafficCheckScheme');

  server.auth.scheme('visitorScheme', visitorScheme);
  server.auth.strategy('visitor', 'visitorScheme');

  // This auth strategy will check the traffic limit for data read for users
  server.auth.strategy('ReadTrafficCheck', 'jwt', {
    key: Token.key,
    validateFunc(decoded, request, callback) {
      const minute = Math.floor(Date.now() / 120000);

      if (!userRead[minute]) {
        userRead[minute] = {};
        userRead[minute][decoded.id] = 1;
      }
      else if (!userRead[minute][decoded.id]) {
        userRead[minute][decoded.id] = 1;
      }
      else {
        userRead[minute][decoded.id] += 1;
      }

      if (userRead[minute] && userRead[minute][decoded.id] > 20) {
        return callback(Boom.tooManyRequests('you have exceeded your request limit, try after 2 minutes.'), false);
      }

      return callback(null, true);
    },
  });

  // This auth strategy will check the traffic limit for data write for users
  server.auth.strategy('WriteTrafficCheck', 'jwt', {
    key: Token.key,
    validateFunc(decoded, request, callback) {
      const minute = Math.floor(Date.now() / 120000);

      if (!userWrite[minute]) {
        userWrite[minute] = {};
        userWrite[minute][decoded.id] = 1;
      }
      else if (!userWrite[minute][decoded.id]) {
        userWrite[minute][decoded.id] = 1;
      }
      else {
        userWrite[minute][decoded.id] += 1;
      }

      if (userWrite[minute] && userWrite[minute][decoded.id] > 2) {
        return callback(Boom.tooManyRequests('you have exceeded your request limit, try after 2 minutes.'), false);
      }

      return callback(null, true);
    },
  });

  next();
};

register.attributes = {
  pkg: {
    name: 'Traffic',
    version: '0.0.1',
    description: 'This plugin will add function for creating traffic check.',
  },
};


/**
 * This function will set minute value to 'userRead', 'userWrite' and 'IP' variable.
 */
setInterval(() => {
  const minute = Math.floor(Date.now() / 120000);

  if (!IP[minute]) {
    IP[minute] = {};
  }

  if (!userRead[minute]) {
    userRead[minute] = {};
  }

  if (!userWrite[minute]) {
    userWrite[minute] = {};
  }
}, 1000);

/**
 * This function will delete 5 minute old value from 'userRead', 'userWrite' and 'IP' variable
 */
setInterval(() => {
  const minute = Math.floor(Date.now() / 120000);

  if (IP[minute - 2]) {
    delete IP[minute - 2];
  }

  if (userRead[minute - 2]) {
    delete userRead[minute - 2];
  }

  if (userWrite[minute - 2]) {
    delete userWrite[minute - 2];
  }
}, 3000);

export default register;
