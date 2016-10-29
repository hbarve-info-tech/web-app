/**
 * Created by himank on 2/8/16.
 */
'use strict';
import Joi    from "joi";
import crypto from "crypto";
import jwt    from "jsonwebtoken";
import Boom   from "boom";

import { userdb }  from "../../database";
import { token } from "../../config";
import { id, username, password, name, email, mobile } from "../../config/schema";

const validateUsername = {
  auth    : {
      mode       : 'required',
      strategies : ['trafficCheck']
  },
  validate: {
    params  : {
      username : username.required()
    }
  },
  handler: (request, reply) => {
    userdb.validateUsername(request.params.username, (result) => {
      if(typeof result.error === "string") {
        return reply(result);
      }

      return reply(result);
    });
  }
};

const signIn     = {
  auth     : {
      mode       : 'required',
      strategies : ['trafficCheck']
  },
  validate : {
    payload : Joi.object({
      username : username.required(),
      password : password.required()
    }).length(2)
  },
  handler  : (request, reply) => {
    userdb.signInByUsername(request.payload.username, (result) => {
      if(typeof result.error === "string") {
        return reply(result);
      }

      let hashedPassword = crypto.createHash('sha256')
        .update(request.payload.password).digest('hex');
      let signInUser = result.payload;

      if(signInUser.password === hashedPassword) {
        jwt.sign({
          id       : signInUser.id,
          username : signInUser.username,
          password : signInUser.password
        }, token.key, {
          expiresIn : '10 days'
        }, (err, token) => {
          if(err) {
            return reply({
              statusCode: 500,
              error     : 'Something went wrong, please try again.'
            });
          }

          return reply({
            statusCode: 200,
            message   : 'Sign In Successful.',
            payload   : {
              id        : signInUser.id.id,
              username  : signInUser.username,
              name      : signInUser.name,
              profilePic: signInUser.profilePic,
              token     : token
            }
          });
        });
      }
      else {
        return reply({
          statusCode: 400,
          error     : 'Username password does not match.',
          message   : 'Username password does not match.'
        });
      }
    });
  }
};

const getUser    = {
  auth    : {
      mode : 'required',
      strategies : ['ReadTrafficCheck', 'owner']
  },
  validate: {
    params : Joi.object({
      id       : id.required()
    }).length(1)
  },
  handler: (request, reply) => {
    userdb.getUserById(request.params.id, (result) => {
      return reply(result);
    });
  }
};

const updateUser = {
  auth    : {
      mode : 'required',
      strategies : ['WriteTrafficCheck', 'owner']
  },
  validate: {
    params : Joi.object({
      id : id.required()
    }),
    payload : Joi.object({
      username    : username,
      name        : name,
      email       : email,
      mobile      : mobile,
      dob         : Joi.date().min('1-1-1974'),
      status      : Joi.string().max(148),
      description : Joi.string().max(300)
    }).min(1).max(6)
  },
  handler: (request, reply) => {
    userdb.updateUserById(request.params.id, request.payload, (result) => {
      return reply(result);
    });
  }
};

const deleteUser = {
  auth    : {
    mode : 'required',
    strategies : ['WriteTrafficCheck', 'admin']
  },
  handler : function(request, reply) {
    userdb.deleteUserById(request.params.id, (result) => {
      return reply(result);
    });
  }
};


export const register = (server, options, next) => {

  server.route([
    {method: 'GET',    path: '/api/validate/username/{username}', config: validateUsername},

    {method: 'POST',   path: '/api/signin',        config: signIn},

    {method: 'GET',    path: '/api/users/{id}',    config: getUser},
    {method: 'PUT',    path: '/api/users/{id}',    config: updateUser},
    {method: 'DELETE', path: '/api/users/{id}',    config: deleteUser}
  ]);

  next();
};

register.attributes = {
  pkg : {
    "name": "User",
    "version": "0.0.1",
    "description": "This plugin contains all the features related to user."
  }
};