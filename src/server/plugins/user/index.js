
import Joi from 'joi';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

import { userdb } from '../../database';
import { Token } from '../../config';
import { Id, Username, Password, Name, Email,
  Mobile, Dob, Status, Description } from '../../config/schema';

const validateUsername = {
  auth: {
    mode: 'required',
    strategies: ['trafficCheck'],
  },
  validate: {
    params: {
      username: Username.required(),
    },
  },
  handler: (request, reply) => {
    userdb.validateUsername(request.params.username, (result) => {
      if (typeof result.error === 'string') {
        return reply(result);
      }

      return reply(result);
    });
  },
};

const signIn = {
  auth: {
    mode: 'required',
    strategies: ['trafficCheck'],
  },
  validate: {
    payload: Joi.object({
      username: Username.required(),
      password: Password.required(),
    }).length(2),
  },
  handler: (request, reply) => {
    const testUser = request.payload;

    userdb.signInByUsername(testUser.username, (result) => {
      if (typeof result.error === 'string') {
        return reply(result);
      }

      const orgUser = result.payload;
      const hashedPassword = crypto.createHash('sha256')
        .update(testUser.password)
        .digest('hex');

      if (orgUser.password === hashedPassword) {
        const userInfo = {
          id: orgUser.id,
          username: orgUser.username,
          password: orgUser.password,
        };
        const options = {
          expiresIn: '10 days',
        };

        jwt.sign(userInfo, Token.key, options, (err, token) => {
          if (err) {
            console.log(err);

            return reply({
              statusCode: 500,
              error: 'Something went wrong, please try again.',
            });
          }

          const { id, username, name, profilePic, classroom } = orgUser;

          const payload = { id, username, name, profilePic, token };

          if (classroom === true) {
            payload.classroom = true;
          }

          return reply({
            statusCode: 200,
            message: 'Sign In Successful.',
            payload,
          });
        });
      }
      else {
        return reply({
          statusCode: 400,
          error: 'Username password does not match.',
          message: 'Username password does not match.',
        });
      }
    });
  },
};

const getUser = {
  auth: {
    mode: 'required',
    strategies: ['ReadTrafficCheck', 'owner'],
  },
  validate: {
    params: Joi.object({
      id: Id.required(),
    }).length(1),
  },
  handler: (request, reply) => {
    userdb.getUserById(request.params.id, result => reply(result));
  },
};

const updateUser = {
  auth: {
    mode: 'required',
    strategies: ['WriteTrafficCheck', 'owner'],
  },
  validate: {
    params: Joi.object({
      id: Id.required(),
    }),
    payload: Joi.object({
      username: Username,
      name: Name,
      email: Email,
      mobile: Mobile,
      dob: Dob,
      status: Status,
      description: Description,
    }).min(1).max(6),
  },
  handler: (request, reply) => {
    userdb.updateUserById(request.params.id, request.payload, result => reply(result));
  },
};

const deleteUser = {
  auth: {
    mode: 'required',
    strategies: ['WriteTrafficCheck', 'admin'],
  },
  handler(request, reply) {
    userdb.deleteUserById(request.params.id, result => reply(result));
  },
};


const register = (server, options, next) => {
  server.route([
    { method: 'GET', path: '/api/validate/username/{username}', config: validateUsername },

    { method: 'POST', path: '/api/signin', config: signIn },

    { method: 'GET', path: '/api/users/{id}', config: getUser },

    { method: 'PUT', path: '/api/users/{id}', config: updateUser },

    { method: 'DELETE', path: '/api/users/{id}', config: deleteUser },
  ]);

  next();
};

register.attributes = {
  pkg: {
    name: 'User',
    version: '0.0.1',
    description: 'This plugin contains all the features related to user.',
  },
};

export default register;
