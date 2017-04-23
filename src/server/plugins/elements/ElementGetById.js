
import Joi from 'joi';

import { elementdb } from '../../database';
import { Id } from '../../config/schema';

export default {
  auth: {
    mode: 'required',
    strategies: ['visitor'],
  },
  validate: {
    params: Joi.object({
      id: Id,
    }).length(1),
  },
  handler: (request, reply) => {
    const { id } = request.params;
    elementdb.getElementById(parseInt(id, 10), result => reply(result));
  },
};
