"use strict";
/**
 * Created by himank on 2/8/16.
 */
import Boom from "boom";

import { token } from "../../config";

let IP        = {};
let userRead  = {};
let userWrite = {};


export const register = (server, options, next) => {

  //This strategy will check the limit of certain IP for 'visitors', who are note logged in.
  server.auth.scheme('trafficCheckScheme', (server, option) => {
    return {
      authenticate: function (request, reply) {
        var minute = Math.floor(Date.now()/120000);

        if(!IP[minute]) {
          IP[minute] = {};
          IP[minute][request.info.remoteAddress] = 1;
        }
        else if(!IP[minute][request.info.remoteAddress]) {
          IP[minute][request.info.remoteAddress] = 1;
        }
        else {
          IP[minute][request.info.remoteAddress]++;
        }

        if(IP[minute] && IP[minute][request.info.remoteAddress] > 20) {
          return reply(Boom.tooManyRequests('you have exceeded your request limit, try after 2 minutes.'));
        }

        return reply.continue({ credentials: {} });
      }
    };
  });
  server.auth.strategy('trafficCheck', 'trafficCheckScheme');

  //This auth strategy will check the traffic limit for data read for users
  server.auth.strategy('ReadTrafficCheck',  'jwt', {
    key          : token.key,
    validateFunc : function (decoded, request, callback) {
      var minute = Math.floor(Date.now()/120000);

      if(!userRead[minute]) {
        userRead[minute] = {};
        userRead[minute][decoded.mayashId] = 1;
      }
      else if(!userRead[minute][decoded.mayashId]) {
        userRead[minute][decoded.mayashId] = 1;
      }
      else {
        userRead[minute][decoded.mayashId]++;
      }

      if(userRead[minute] && userRead[minute][decoded.mayashId] > 20) {
        return callback(Boom.tooManyRequests('you have exceeded your request limit, try after 2 minutes.'), false);
      }

      return callback(null, true);
    }
  });

  //This auth strategy will check the traffic limit for data write for users
  server.auth.strategy('WriteTrafficCheck', 'jwt', {
    key          : token.key,
    validateFunc : function (decoded, request, callback) {
      var minute = Math.floor(Date.now()/120000);

      if(!userWrite[minute]) {
        userWrite[minute] = {};
        userWrite[minute][decoded.mayashId] = 1;
      }
      else if(!userWrite[minute][decoded.mayashId]) {
        userWrite[minute][decoded.mayashId] = 1;
      }
      else {
        userWrite[minute][decoded.mayashId]++;
      }

      if(userWrite[minute] && userWrite[minute][decoded.mayashId] > 2) {
        return callback(Boom.tooManyRequests('you have exceeded your request limit, try after 2 minutes.'), false);
      }

      return callback(null, true);
    }
  });

  next();
};

register.attributes = {
  pkg : {
    "name": "Traffic",
    "version": "0.0.1",
    "description": "This plugin will add function for creating traffic check."
  }
};




/**
 * This function will set minute value to 'userRead', 'userWrite' and 'IP' variable.
 */
setInterval(function Set() {
  var minute = Math.floor(Date.now()/120000);

  if(!IP[minute]) {
    IP[minute] = {};
  }

  if(!userRead[minute]) {
    userRead[minute] = {};
  }

  if(!userWrite[minute]) {
    userWrite[minute] = {};
  }

}, 1000);

/**
 * This function will delete 5 minute old value from 'userRead', 'userWrite' and 'IP' variable
 */
setInterval(function reSet() {
  var minute = Math.floor(Date.now()/120000);

  if(IP[minute - 2]) {
    delete IP[minute - 2];
  }

  if(userRead[minute - 2]) {
    delete userRead[minute - 2];
  }

  if(userWrite[minute - 2]) {
    delete userWrite[minute - 2];
  }

}, 3000);