"use strict";
//Global variables are defined here.
export const COURSE_CREATE         = 'COURSE_CREATE';
export const COURSE_CREATE_START   = 'COURSE_CREATE_START';
export const COURSE_CREATE_SUCCESS = 'COURSE_CREATE_SUCCESS';
export const COURSE_CREATE_ERROR   = 'COURSE_CREATE_ERROR';

export const COURSES_FETCH          = 'COURSES_FETCH';
export const COURSES_FETCH_START    = 'COURSES_FETCH_START';
export const COURSES_FETCH_SUCCESS  = 'COURSES_FETCH_SUCCESS';
export const COURSES_FETCH_ERROR    = 'COURSES_FETCH_ERROR';

export const COURSE_FETCH          = 'COURSE_FETCH';
export const COURSE_FETCH_START    = 'COURSE_FETCH_START';
export const COURSE_FETCH_SUCCESS  = 'COURSE_FETCH_SUCCESS';
export const COURSE_FETCH_ERROR    = 'COURSE_FETCH_ERROR';

export const COURSE_UPDATE         = 'COURSE_UPDATE';
export const COURSE_UPDATE_START   = 'COURSE_UPDATE_START';
export const COURSE_UPDATE_SUCCESS = 'COURSE_UPDATE_SUCCESS';
export const COURSE_UPDATE_ERROR   = 'COURSE_UPDATE_ERROR';

export const COURSE_DELETE         = 'COURSE_DELETE';
export const COURSE_DELETE_START   = 'COURSE_DELETE_START';
export const COURSE_DELETE_SUCCESS = 'COURSE_DELETE_SUCCESS';
export const COURSE_DELETE_ERROR   = 'COURSE_DELETE_ERROR';

export const MODULE_CREATE         = 'MODULE_CREATE';
export const MODULE_CREATE_START   = 'MODULE_CREATE_START';
export const MODULE_CREATE_SUCCESS = 'MODULE_CREATE_SUCCESS';
export const MODULE_CREATE_ERROR   = 'MODULE_CREATE_ERROR';

export const MODULES_FETCH          = 'MODULES_FETCH';
export const MODULES_FETCH_START    = 'MODULES_FETCH_START';
export const MODULES_FETCH_SUCCESS  = 'MODULES_FETCH_SUCCESS';
export const MODULES_FETCH_ERROR    = 'MODULES_FETCH_ERROR';

export const MODULE_FETCH          = 'MODULE_FETCH';
export const MODULE_FETCH_START    = 'MODULE_FETCH_START';
export const MODULE_FETCH_SUCCESS  = 'MODULE_FETCH_SUCCESS';
export const MODULE_FETCH_ERROR    = 'MODULE_FETCH_ERROR';

export const MODULE_UPDATE         = 'MODULE_UPDATE';
export const MODULE_UPDATE_START   = 'MODULE_UPDATE_START';
export const MODULE_UPDATE_SUCCESS = 'MODULE_UPDATE_SUCCESS';
export const MODULE_UPDATE_ERROR   = 'MODULE_UPDATE_ERROR';

export const MODULE_DELETE         = 'MODULE_DELETE';
export const MODULE_DELETE_START   = 'MODULE_DELETE_START';
export const MODULE_DELETE_SUCCESS = 'MODULE_DELETE_SUCCESS';
export const MODULE_DELETE_ERROR   = 'MODULE_DELETE_ERROR';

import { browserHistory } from "react-router";

//Import library here.
import fetch from 'isomorphic-fetch';

import * as api from "../apis";

export const createCourseStart  = ()        => {
  return {
    type: COURSE_CREATE_START
  };
};
export const createCourseSuccess= (payload) => {
  return {
    type: COURSE_CREATE_SUCCESS,
    payload
  };
};
export const createCourseError  = (payload) => {
  return {
    type: COURSE_CREATE_ERROR,
    payload
  };
};
export const createCourse       = (payload) => {
  return (dispatch) => {

    dispatch(createCourseStart());

    fetch('/api/elements/' + api.getUserId() + '/courses', {
      method: 'POST',
      headers: {
        'Accept'       : 'application/json',
        'Content-Type' : 'application/json',
        'Authorization': api.getToken()
      },
      body: JSON.stringify(payload)
    })
      .then(response => response.json())
      .then(
        (json) => {
          if(json.statusCode === 201) {
            dispatch(createCourseSuccess(json.payload));
            browserHistory.push('/courses/' + json.payload.courseId);
          }
          else if(json.statusCode >= 400) {
            dispatch(createCourseError(json));
          }
        }
      );
  };
};

export const fetchCourseStart  = (payload) => {
  return {
    type: COURSE_FETCH_START,
    payload
  };
};
export const fetchCourseSuccess= (payload) => {
  return {
    type: COURSE_FETCH_SUCCESS,
    payload
  };
};
export const fetchCourseError  = (payload) => {
  return {
    type: COURSE_FETCH_ERROR,
    payload
  };
};
export const fetchCourse       = (payload) => {
  return (dispatch) => {

    dispatch(fetchCourseStart(payload));

    fetch('/api/courses/' + payload.courseId, {
      method: 'GET',
      headers: {
        'Accept'       : 'application/json',
        'Content-Type' : 'application/json',
        'Authorization': api.getToken()
      }
    })
      .then(response => response.json())
      .then(
        (json) => {
          if(json.statusCode === 200) {
            dispatch(fetchCourseSuccess(json.payload));
          }
          else if(json.statusCode >= 400) {
            dispatch(fetchCourseError(json));
          }
        }
      );
  };
};

export const fetchCoursesStart  = (payload) => {
  return {
    type: COURSES_FETCH_START,
    payload
  };
};
export const fetchCoursesSuccess= (payload) => {
  return {
    type: COURSES_FETCH_SUCCESS,
    payload
  };
};
export const fetchCoursesError  = (payload) => {
  return {
    type: COURSES_FETCH_ERROR,
    payload
  };
};
export const fetchCourses       = (authorId) => {
  return (dispatch) => {

    dispatch(fetchCoursesStart({authorId}));

    api.getCourses((json) => {
      if(json.statusCode === 200) {
        dispatch(fetchCoursesSuccess(json.payload));
      }
      else if(json.statusCode >= 400) {
        dispatch(fetchCoursesError(json));
      }
    });
  };
};

export const updateCourseStart  = (payload) => {
  return {
    type: COURSE_UPDATE_START,
    payload
  };
};
export const updateCourseSuccess= (payload) => {
  return {
    type: COURSE_UPDATE_SUCCESS,
    payload
  };
};
export const updateCourseError  = (payload) => {
  return {
    type: COURSE_UPDATE_ERROR,
    payload
  };
};
export const updateCourse       = (courseId, payload) => {
  return (dispatch) => {

    dispatch(updateCourseStart({courseId}));

    api.updateCourse(courseId, payload, (json) => {
      if(json.statusCode === 200) {
        payload.courseId = courseId;
        dispatch(updateCourseSuccess(payload));
      }
      else if(json.statusCode >= 400) {
        dispatch(updateCourseError(json));
      }
    });
  };
};

export const deleteCourseStart  = ()        => {
  return {
    type: COURSE_DELETE_START
  };
};
export const deleteCourseSuccess= (payload) => {
  return {
    type: COURSE_DELETE_SUCCESS,
    payload
  };
};
export const deleteCourseError  = (payload) => {
  return {
    type: COURSE_DELETE_ERROR,
    payload
  };
};
export const deleteCourse       = (payload) => {
  return {
    type: COURSE_DELETE,
    payload
  };
};



export const createModuleStart  = (payload) => {
  return {
    type: MODULE_CREATE_START,
    payload
  };
};
export const createModuleSuccess= (payload) => {
  return {
    type: MODULE_CREATE_SUCCESS,
    payload
  };
};
export const createModuleError  = (payload) => {
  return {
    type: MODULE_CREATE_ERROR,
    payload
  };
};
export const createModule       = (courseId, payload) => {
  return (dispatch) => {

    dispatch(createModuleStart({courseId}));

    api.createModule(courseId, payload, (json) => {
      if(json.statusCode === 201) {
        dispatch(createModuleSuccess(json.payload));
      }
      else if(json.statusCode >= 400) {
        dispatch(createModuleError(json));
      }
    });
  };
};

export const fetchModuleStart  = (payload) => {
  return {
    type: MODULE_FETCH_START,
    payload
  };
};
export const fetchModuleSuccess= (payload) => {
  return {
    type: MODULE_FETCH_SUCCESS,
    payload
  };
};
export const fetchModuleError  = (payload) => {
  return {
    type: MODULE_FETCH_ERROR,
    payload
  };
};
export const fetchModule       = (payload) => {
  return (dispatch) => {
    dispatch(fetchModuleStart(payload));

    api.getModule(payload.courseId, payload.moduleId, (json) => {
      if(json.statusCode === 200) {
        dispatch(fetchModuleSuccess(json.payload));
      }
      else if(json.statusCode >= 400) {
        dispatch(fetchModuleError(json));
      }
    });

  };
};

export const fetchModulesStart  = (payload) => {
  return {
    type: MODULES_FETCH_START,
    payload
  };
};
export const fetchModulesSuccess= (payload) => {
  return {
    type: MODULES_FETCH_SUCCESS,
    payload
  };
};
export const fetchModulesError  = (payload) => {
  return {
    type: MODULES_FETCH_ERROR,
    payload
  };
};
export const fetchModules       = (courseId) => {
  return (dispatch) => {

    dispatch(fetchModulesStart({courseId}));

    api.getModules(courseId, (json) => {
      if(json.statusCode === 200) {
        dispatch(fetchModulesSuccess({
          courseId,
          modules: json.payload
        }));
      }
      else if(json.statusCode >= 400) {
        dispatch(fetchModulesError(json));
      }
    });
  };
};

export const updateModuleStart  = (courseId, moduleId) => {
  return {
    type: MODULE_UPDATE_START,
    payload : {
      courseId,
      moduleId
    }
  };
};
export const updateModuleError  = (courseId, moduleId, payload) => {
  payload.courseId = courseId;
  payload.moduleId = moduleId;
  return {
    type: MODULE_UPDATE_ERROR,
    payload
  };
};
export const updateModuleSuccess= (courseId, moduleId, payload) => {
  payload.courseId = courseId;
  payload.moduleId = moduleId;
  return {
    type: MODULE_UPDATE_SUCCESS,
    payload
  };
};
export const updateModule       = (courseId, moduleId, payload) => {
  return (dispatch) => {

    dispatch(updateModuleStart(courseId, moduleId));

    api.updateModule(courseId, moduleId, payload, (json) => {
      if(json.statusCode === 200) {
        dispatch(updateModuleSuccess(courseId, moduleId, payload));
      }
      else if(json.statusCode >= 400) {
        dispatch(updateModuleError(courseId, moduleId, json));
      }
    });
  };
};

export const deleteModuleStart  = (payload) => {
  return {
    type: MODULE_DELETE_START,
    payload
  };
};
export const deleteModuleSuccess= (payload) => {
  return {
    type: MODULE_DELETE_SUCCESS,
    payload
  };
};
export const deleteModuleError  = (payload) => {
  return {
    type: MODULE_DELETE_ERROR,
    payload
  };
};
export const deleteModule       = (payload) => {
  return {
    type: MODULE_DELETE,
    payload
  };
};


