
import Joi from 'joi';

import { classroomdb } from '../../database';
import { Id, Degree, Semester, Next } from '../../config/schema';

const getCourses = {
  auth: {
    mode: 'required',
    strategies: ['visitor'],
  },
  validate: {
    params: Joi.object({
      id: Id.required(),
    }),
    query: Joi.object({
      semester: Semester,
      degree: Degree,
      next: Next,
    }).max(3),
  },
  handler: (request, reply) => {
    const params = {
      id: request.params.id,
      ...request.query,
    };

    classroomdb.getClassroomCourses(params, result => reply(result));
  },
};

const register = (server, options, next) => {
  server.route([
    { method: 'GET', path: '/api/classroom/{id}/courses', config: getCourses },
  ]);

  next();
};

register.attributes = {
  pkg: {
    name: 'Classroom',
    version: '0.0.1',
    description: 'This plugin contains all the features related to Classroom.',
  },
};

export default register;
