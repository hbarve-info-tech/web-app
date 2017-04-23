
import Joi from 'joi';

import { elementdb } from '../../database';
import { Id, Username } from '../../config/schema';

export default {
  auth: {
    mode: 'required',
    strategies: ['visitor'],
  },
  validate: {
    query: Joi.object({
      id: Id,
      username: Username,
    }).length(1),
  },
  handler: (request, reply) => {
    const { username, id } = request.query;
    if (typeof username !== 'undefined') {
      elementdb.getElementByUsername(username, result => reply(result));
    }
    else {
      elementdb.getElementById(parseInt(id, 10), result => reply(result));
    }
  },
};
