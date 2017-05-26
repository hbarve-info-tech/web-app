
// Import library here.
import api from '../api/courses';

import {
  COURSE_CREATE_SUCCESS, COURSE_CREATE_ERROR,

  COURSES_GET_START, COURSES_GET_ERROR, COURSES_GET_SUCCESS,
  COURSE_GET_START, COURSE_GET_ERROR, COURSE_GET_SUCCESS,
  COURSE_UPDATE_START, COURSE_UPDATE_SUCCESS, COURSE_UPDATE_ERROR,
  MODULES_GET_START, MODULES_GET_SUCCESS, MODULES_GET_ERROR,
  MODULE_GET_START, MODULE_GET_SUCCESS, MODULE_GET_ERROR,
  MODULE_UPDATE_START, MODULE_UPDATE_SUCCESS, MODULE_UPDATE_ERROR,
} from '../constants/courses';

const getCourseStart = payload => ({ type: COURSE_GET_START, payload });
const getCourseSuccess = payload => ({ type: COURSE_GET_SUCCESS, payload });
const getCourseError = payload => ({ type: COURSE_GET_ERROR, payload });
export const getCourse = ({ courseId, token }) => (dispatch) => {
  dispatch(getCourseStart({ courseId: parseInt(courseId, 10) }));

  api.getCourse({ courseId, token }, (json) => {
    if (json.statusCode === 200) {
      dispatch(getCourseSuccess({ ...json.payload, courseId: parseInt(courseId, 10) }));
    }
    else if (json.statusCode >= 400) {
      dispatch(getCourseError({ courseId: parseInt(courseId, 10), ...json }));
    }
  });
};

export const getCoursesStart = payload => ({ type: COURSES_GET_START, payload });
export const getCoursesSuccess = payload => ({ type: COURSES_GET_SUCCESS, payload });
export const getCoursesError = payload => ({ type: COURSES_GET_ERROR, payload });
export const getCourses = ({ id, token }) => (dispatch) => {
  dispatch(getCoursesStart({ id }));

  api.getCourses({ id, token }, (json) => {
    if (json.statusCode === 200) {
      dispatch(getCoursesSuccess(json.payload));
    }
    else if (json.statusCode >= 400) {
      dispatch(getCoursesError(json));
    }
  });
};

const updateCourseStart = payload => ({ type: COURSE_UPDATE_START, payload });
const updateCourseSuccess = payload => ({ type: COURSE_UPDATE_SUCCESS, payload });
const updateCourseError = payload => ({ type: COURSE_UPDATE_ERROR, payload });
export const updateCourse = ({
  id,
  token,
  courseId,
  courseName,
  description,
  standard,
  level,
}) => (dispatch) => {
  dispatch(updateCourseStart({ courseId: parseInt(courseId, 10) }));

  api.updateCourse({
    id,
    token,
    courseId,
    courseName,
    description,
    standard,
    level,
  }, (json) => {
    console.log(json);
    if (json.statusCode === 200) {
      const payload = { courseId: parseInt(courseId, 10) };

      if (courseName) {
        payload.courseName = courseName;
      }
      if (description) {
        payload.description = description;
      }
      if (standard) {
        payload.standard = standard;
      }
      if (level) {
        payload.level = level;
      }

      dispatch(updateCourseSuccess(payload));
    }
    else if (json.statusCode >= 400) {
      dispatch(updateCourseError(json));
    }
  });
};


const getModuleStart = payload => ({ type: MODULE_GET_START, payload });
const getModuleSuccess = payload => ({ type: MODULE_GET_SUCCESS, payload });
const getModuleError = payload => ({ type: MODULE_GET_ERROR, payload });
export const getModule = ({ courseId, moduleId, token }) => (dispatch) => {
  dispatch(getModuleStart({ courseId, moduleId }));

  api.getModule({ courseId, moduleId, token }, (json) => {
    if (json.statusCode === 200) {
      dispatch(getModuleSuccess(json.payload));
    }
    else if (json.statusCode >= 400) {
      dispatch(getModuleError(json));
    }
  });
};

const getModulesStart = payload => ({ type: MODULES_GET_START, payload });
const getModulesSuccess = payload => ({ type: MODULES_GET_SUCCESS, payload });
const getModulesError = payload => ({ type: MODULES_GET_ERROR, payload });
export const getModules = ({ courseId, token }) => (dispatch) => {
  dispatch(getModulesStart({ courseId: parseInt(courseId, 10) }));

  api.getModules({ courseId: parseInt(courseId, 10) , token }, (json) => {
    if (json.statusCode === 200) {
      dispatch(getModulesSuccess({ courseId: parseInt(courseId, 10) , modules: json.payload }));
    }
    else if (json.statusCode >= 400) {
      dispatch(getModulesError({ courseId: parseInt(courseId, 10), ...json }));
    }
  });
};

const updateModuleStart = payload => ({ type: MODULE_UPDATE_START, payload });
const updateModuleError = payload => ({ type: MODULE_UPDATE_ERROR, payload });
const updateModuleSuccess = payload => ({ type: MODULE_UPDATE_SUCCESS, payload });
export const updateModule = ({
  id,
  token,
  courseId,
  moduleId,
  moduleName,
  moduleData,
}) => (dispatch) => {
  const payload = {
    courseId: parseInt(courseId, 10),
    moduleId: parseInt(moduleId, 10),
  };
  dispatch(updateModuleStart(payload));

  api.updateModule({
    id,
    token,
    courseId,
    moduleId,
    moduleName,
    moduleData,
  }, (json) => {
    if (json.statusCode === 200) {
      if (moduleName) {
        payload.moduleName = moduleName;
      }
      if (moduleData) {
        payload.moduleData = moduleData;
      }

      dispatch(updateModuleSuccess(payload));
    }
    else if (json.statusCode >= 400) {
      dispatch(updateModuleError({ ...payload, ...json }));
    }
  });
};

export default {

  getCourse,
  getModule,

  getCourses,
  getModules,

  updateCourse,
  updateModule,

};
