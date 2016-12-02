/**
 * Created by himank on 2/8/16.
 */
'use strict';
import Joi    from "joi";

import { coursedb }  from "../../database";
import {
  id, courseId, moduleId, courseName,
  level, description, standard,
  moduleName, moduleData
} from "../../config/schema";

const getCourses   = {
  auth    : {
    mode       : 'required',
    strategies : ['ReadTrafficCheck', 'user']
  },
  validate: {
    params : Joi.object({
      id : id.required()
    })
  },
  handler : (request, reply) => {
    coursedb.getCoursesById(
      request.params.id,
      (result) => reply(result)
    );
  }
};

const getCourse    = {
  auth    : {
    mode       : 'required',
    strategies : ['ReadTrafficCheck', 'user']
  },
  validate: {
    params : Joi.object({
      courseId : courseId.required()
    })
  },
  handler : (request, reply) => {
    coursedb.getCourseByCourseId(
      request.params.courseId,
      (result) => reply(result)
    );
  }
};
const getModules   = {
  auth    : {
    mode       : 'required',
    strategies : ['ReadTrafficCheck', 'user']
  },
  validate: {
    params : Joi.object({
      courseId : courseId.required()
    })
  },
  handler : (request, reply) => {
    coursedb.getModulesByCourseId(
      request.params.courseId,
      (result) => reply(result));
  }
};
const getModule    = {
  auth    : {
    mode       : 'required',
    strategies : ['ReadTrafficCheck', 'user']
  },
  validate: {
    params : Joi.object({
      courseId : courseId.required(),
      moduleId : moduleId.required(),
    })
  },
  handler : (request, reply) => {
    coursedb.getModuleByModuleId(
      request.params.courseId,
      request.params.moduleId,
      (result) => reply(result)
    );
  }
};

const createCourse = {
  auth     : {
    mode       : 'required',
    strategies : ['WriteTrafficCheck', 'owner']
  },
  validate : {
    params : Joi.object({
      id       : id.required()
    }),
    payload: Joi.object({
      courseName : courseName.required(),
      level      : level,
      standard   : standard,
      description: description
    })
  },
  handler  : (request, reply) => {
    coursedb.createCourseById(
      request.params.id,
      request.payload,
      (result) => reply(result)
    );
  }
};
const createModule = {
  auth     : {
    mode       : 'required',
    strategies : ['WriteTrafficCheck', 'owner']
  },
  validate : {
    params : Joi.object({
      id       : id.required(),
      courseId : courseId.required()
    }),
    payload: Joi.object({
      moduleName : moduleName.required()
    })
  },
  handler  : (request, reply) => {
    coursedb.createModuleByCourseId(
      request.params.courseId,
      request.payload,
      (result) => reply(result)
    );
  }
};

const updateCourse = {
  auth     : {
    mode       : 'required',
    strategies : ['WriteTrafficCheck', 'owner']
  },
  validate : {
    params : Joi.object({
      id       : id.required(),
      courseId : courseId.required()
    }),
    payload: Joi.object({
      courseName : courseName.required(),
      level      : level.required(),
      standard   : standard.required(),
      description: description.required()
    })
  },
  handler  : (request, reply) => {
    coursedb.updateCourseByCourseId(
      request.params.courseId,
      request.payload,
      (result) => reply(result)
    );
  }
};
const updateModule = {
  auth    : {
    mode       : 'required',
    strategies : ['WriteTrafficCheck', 'owner']
  },
  validate : {
    params : Joi.object({
      id       : id.required(),
      courseId : courseId.required(),
      moduleId : moduleId.required()
    }),
    payload: Joi.object({
      moduleName: moduleName,
      moduleData: moduleData
    }).min(1)
  },
  handler : (request, reply) => {
    coursedb.updateModuleByModuleId(
      request.params.moduleId,
      request.payload,
      (result) => reply(result)
    );
  }
};

const deleteCourse = {
  auth    : {
    mode       : 'required',
    strategies : ['WriteTrafficCheck', 'owner']
  },
  validate: {
    params : Joi.object({
      id       : id.required(),
      courseId : courseId.required()
    })
  },
  handler : (request, reply) => {
    coursedb.deleteCourseByCourseId(
      request.params.courseId,
      (result) => reply(result)
    );
  }
};
const deleteModule = {
  auth    : {
    mode       : 'required',
    strategies : ['WriteTrafficCheck', 'owner']
  },
  validate: {
    params : Joi.object({
      id       : id.required(),
      courseId : courseId.required(),
      moduleId : moduleId.required()
    })
  },
  handler : (request, reply) => {
    coursedb.deleteModuleByModuleId(
      request.params.moduleId,
      (result) => reply(result)
    );
  }
};


export const register = (server, options, next) => {

  server.route([

    //Get all the courses of respective element
    {method: 'GET',    path: '/api/elements/{id}/courses',            config: getCourses},
    //Get course details with courseId
    {method: 'GET',    path: '/api/courses/{courseId}',               config: getCourse},
    //Create new course for element with 'id'
    {method: 'POST',   path: '/api/elements/{id}/courses',            config: createCourse},
    //Update course for element with 'id' and course with 'courseId'
    {method: 'PUT',    path: '/api/elements/{id}/courses/{courseId}', config: updateCourse},
    //Delete course for element with 'id' and course with 'courseId'
    {method: 'DELETE', path: '/api/elements/{id}/courses/{courseId}', config: deleteCourse},

    //Get all the modules of respective course with 'courseId'
    {method: 'GET',    path: '/api/courses/{courseId}/modules',               config: getModules},
    //Get course's module with 'courseId' and 'moduleId'
    {method: 'GET',    path: '/api/courses/{courseId}/modules/{moduleId}',    config: getModule},
    //Create new Module for element with 'id' and course with 'courseId'
    {method: 'POST',   path: '/api/elements/{id}/courses/{courseId}/modules', config: createModule},
    //Update module for element with 'id' and course with 'courseId' and module with 'moduleId'
    {method: 'PUT',    path: '/api/elements/{id}/courses/{courseId}/modules/{moduleId}', config: updateModule},
    //Delete module for element with 'id' and course with 'courseId' and module with 'moduleId'
    {method: 'DELETE', path: '/api/elements/{id}/courses/{courseId}/modules/{moduleId}', config: deleteModule}
  ]);

  next();
};

register.attributes = {
  pkg : {
    "name": "Courses",
    "version": "0.0.1",
    "description": "This plugin contains all the features related to Course."
  }
};