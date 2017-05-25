
import Joi from 'joi';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

import { elementdb } from '../../database';
import { Token } from '../../config';
import { Username, Password } from '../../config/schema';


export default {
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

    elementdb.signInByUsername(testUser.username, (result) => {
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

          const { id, username, name, avatar, profilePic, classroom } = orgUser;

          const payload = { id, username, name, avatar, profilePic, token };

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
