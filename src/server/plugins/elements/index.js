
import Joi from 'joi';

import { elementdb } from '../../database';
import { Id, Username } from '../../config/schema';

const getElement = {
  auth: {
    mode: 'required',
    strategies: ['ReadTrafficCheck', 'user'],
  },
  validate: {
    query: Joi.object({
      id: Id,
      username: Username,
    }).length(1),
  },
  handler: (request, reply) => {
    const { username, id } = request.query;
    if (Username) {
      elementdb.getElementByUsername(username, result => reply(result));
    }
    else {
      elementdb.getElementById(parseInt(id, 10), result => reply(result));
    }
  },
};

const register = (server, options, next) => {
  server.route([

    { method: 'GET', path: '/api/elements', config: getElement },

  ]);

  next();
};

register.attributes = {
  pkg: {
    name: 'Elements',
    version: '0.0.1',
    description: 'This plugin contains all the features related to element.',
  },
};

export default register;
