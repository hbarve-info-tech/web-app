
import Joi from 'joi';

import { elementdb } from '../../database';
import { Username, Password, Name, ElementType, CircleType, Classroom } from '../../config/schema';

export default {
  auth: {
    mode: 'required',
    strategies: ['visitor'],
  },
  validate: {
    payload: Joi.object({
      username: Username.required(),
      name: Name.required(),
      elementType: ElementType.required(),
      circleType: CircleType.when('elementType', { is: 'circle', then: Joi.required() }),
      password: Password.required(),
      classroom: Classroom.required(),
    }).length(6),
  },
  handler: (request, reply) => {
    elementdb.createElement(request.payload, result => reply(result));
  },
};
