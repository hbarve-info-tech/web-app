
import Joi from 'joi';

import { classroomdb } from '../mayash-database';
import { Id, Degree, Semester, Next } from '../mayash-api-common/schema';

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

export const Routes = [
  { method: 'GET', path: '/api/classroom/{id}/courses', config: getCourses },
];

export default Routes;
