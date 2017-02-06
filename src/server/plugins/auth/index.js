
import { Token } from '../../config';

const register = (server, options, next) => {
  // All the auth strategies are registered here.
  // 'admin' strategy will allow only those who has admin rights.
  server.auth.strategy('admin', 'jwt', {
    key: Token.key,
    validateFunc(decoded, request, callback) {
      if (decoded.id === 5365928028012544) {
        return callback(null, true);
      }
      return callback(null, false);
    },
  });
  // 'user' strategy will allow only those who has got our authorised token.
  server.auth.strategy('user', 'jwt', {
    key: Token.key,
    validateFunc(decoded, request, callback) {
      return callback(null, true);
    },
  });
  // 'owner' strategy will allow only those who has got our authorised token and he/she
  // should be making request.
  server.auth.strategy('owner', 'jwt', {
    key: Token.key,
    validateFunc(decoded, request, callback) {
      if (decoded.id === request.params.id) {
        return callback(null, true);
      }

      return callback(null, false);
    },
  });
  // 'guru' auth is allow user to create courses.
  server.auth.strategy('guru', 'jwt', {
    key: Token.key,
    validateFunc(decoded, request, callback) {
      return callback(null, false);
    },
  });

  next();
};

register.attributes = {
  pkg: {
    name: 'Auth',
    version: '0.0.1',
    description: 'This plugins create all the token auth strategy for this project.',
  },
};

export default register;
