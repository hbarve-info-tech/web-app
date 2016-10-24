"use strict";
/**
 * Created by himank on 2/8/16.
 */

import { token } from "../../config";

export const register = (server, options, next) => {

  //All the auth strategies are registered here.
  // 'admin' strategy will allow only those who has admin rights.
  server.auth.strategy('admin',    'jwt', {
    key          : token.key,
    validateFunc : function (decoded, request, callback) {
      if(decoded.mayashId === 'hbarve1') {
        return callback(null, true);
      } else {
        return callback(null, false);
      }
    }
  });
  //'user' strategy will allow only those who has got our authorised token.
  server.auth.strategy('user',     'jwt', {
    key          : token.key,
    validateFunc : function (decoded, request, callback) {
      request.mayash = {};
      request.mayash.user = decoded;
      return callback(null, true);
    }
  });
  //'owner' strategy will allow only those who has got our authorised token and he/she
  // should be making request.
  server.auth.strategy('owner',    'jwt', {
    key          : token.key,
    validateFunc : function (decoded, request, callback) {
      if(decoded.id === request.params.id) {
        request.mayash = {};
        request.mayash.user = decoded;
        return callback(null, true);
      } else {
        return callback(null, false);
      }
    }
  });
  //'guru' auth is allow user to create courses.
  server.auth.strategy('guru',     'jwt', {
    key          : token.key,
    validateFunc : function (decoded, request, callback) {
      if(decoded.mayashId === request.params.mayashId) {
        user.getUser({
          params : {
            mayashId : decoded.mayashId
          },
          query : {
            q : 'details'
          }
        }, function(err, user) {
          if(user !== null && user.classroom !== null) {
            request.mayash = {};
            request.mayash.user = user;

            return callback(null, true);
          } else {
            return callback(null, false);
          }
        });
      } else {
        return callback(null, false);
      }
    }
  });

  next();
};

register.attributes = {
  pkg : {
    "name": "Auth",
    "version": "0.0.1",
    "description": "This plugins create all the token auth strategy for this project."
  }
};