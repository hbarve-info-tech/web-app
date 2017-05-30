
import Joi from 'joi';

import { elementdb } from '../mayash-database';
import { Username, Password, Name, ElementType, CircleType, Classroom } from '../mayash-api-common/schema';

export default {
  auth: {
    mode: 'required',
    strategies: ['admin'],
  },
  validate: {
    payload: Joi.object({
      username: Username.required(),
      name: Name.required(),
      elementType: ElementType.required(),
      circleType: CircleType.when('elementType', { is: 'circle', then: Joi.required() }),
      password: Password.required(),
      classroom: Classroom.required(),
    }).min(5).max(6),
  },
  handler: (request, reply) => {
    elementdb.createElement(request.payload, result => reply(result));
  },
};
