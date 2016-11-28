'use strict';
import Joi from "joi";

import { classroomdb }  from "../../database";
import { id } from "../../config/schema";

const getCourses   = {
  auth    : {
    mode       : 'required',
    strategies : ['ReadTrafficCheck', 'user']
  },
  validate: {
    params : Joi.object({
      id : id.required()
    }),
    query : Joi.object({
      semester: Joi.number().integer(),
      degree  : Joi.string(),
      next    : Joi.string()
    }).max(3)
  },
  handler : (request, reply) => {
    let params = {
      id: request.params.id,
      ...request.query
    };

    classroomdb.getClassroomCourses(params, (result) => reply(result));
  }
};

export const register = (server, options, next) => {

  server.route([
    {method: 'GET', path: '/api/classroom/{id}/courses', config: getCourses}
  ]);

  next();
};

register.attributes = {
  pkg : {
    "name": "Classroom",
    "version": "0.0.1",
    "description": "This plugin contains all the features related to Classroom."
  }
};
