
// Import library here.
import * as api from '../api';

// Global variables are defined here.
export const COURSES_FETCH = 'COURSES_FETCH';
export const COURSES_FETCH_START = 'COURSES_FETCH_START';
export const COURSES_FETCH_SUCCESS = 'COURSES_FETCH_SUCCESS';
export const COURSES_FETCH_ERROR = 'COURSES_FETCH_ERROR';

export const COURSE_FETCH = 'COURSE_FETCH';
export const COURSE_FETCH_START = 'COURSE_FETCH_START';
export const COURSE_FETCH_SUCCESS = 'COURSE_FETCH_SUCCESS';
export const COURSE_FETCH_ERROR = 'COURSE_FETCH_ERROR';

export const MODULES_FETCH = 'MODULES_FETCH';
export const MODULES_FETCH_START = 'MODULES_FETCH_START';
export const MODULES_FETCH_SUCCESS = 'MODULES_FETCH_SUCCESS';
export const MODULES_FETCH_ERROR = 'MODULES_FETCH_ERROR';

export const MODULE_FETCH = 'MODULE_FETCH';
export const MODULE_FETCH_START = 'MODULE_FETCH_START';
export const MODULE_FETCH_SUCCESS = 'MODULE_FETCH_SUCCESS';
export const MODULE_FETCH_ERROR = 'MODULE_FETCH_ERROR';


const fetchCourseStart = payload => ({ type: COURSE_FETCH_START, payload });
const fetchCourseSuccess = payload => ({ type: COURSE_FETCH_SUCCESS, payload });
const fetchCourseError = payload => ({ type: COURSE_FETCH_ERROR, payload });
export const fetchCourse = ({ courseId, token }) => (dispatch) => {
  dispatch(fetchCourseStart({ courseId }));

  api.getCourse({ courseId, token }, (json) => {
    if (json.statusCode === 200) {
      dispatch(fetchCourseSuccess(json.payload));
    }
    else if (json.statusCode >= 400) {
      dispatch(fetchCourseError(json));
    }
  });
};

export const fetchCoursesStart = payload => ({ type: COURSES_FETCH_START, payload });
export const fetchCoursesSuccess = payload => ({ type: COURSES_FETCH_SUCCESS, payload });
export const fetchCoursesError = payload => ({ type: COURSES_FETCH_ERROR, payload });
export const fetchCourses = ({ id, token }) => (dispatch) => {
  dispatch(fetchCoursesStart({ id }));

  api.getCourses({ id, token }, (json) => {
    if (json.statusCode === 200) {
      dispatch(fetchCoursesSuccess(json.payload));
    }
    else if (json.statusCode >= 400) {
      dispatch(fetchCoursesError(json));
    }
  });
};

const fetchModuleStart = payload => ({ type: MODULE_FETCH_START, payload });
const fetchModuleSuccess = payload => ({ type: MODULE_FETCH_SUCCESS, payload });
const fetchModuleError = payload => ({ type: MODULE_FETCH_ERROR, payload });
export const fetchModule = ({ courseId, moduleId, token }) => (dispatch) => {
  dispatch(fetchModuleStart({ courseId, moduleId }));

  api.getModule({ courseId, moduleId, token }, (json) => {
    if (json.statusCode === 200) {
      dispatch(fetchModuleSuccess(json.payload));
    }
    else if (json.statusCode >= 400) {
      dispatch(fetchModuleError(json));
    }
  });
};

const fetchModulesStart = payload => ({ type: MODULES_FETCH_START, payload });
const fetchModulesSuccess = payload => ({ type: MODULES_FETCH_SUCCESS, payload });
const fetchModulesError = payload => ({ type: MODULES_FETCH_ERROR, payload });
export const fetchModules = ({ courseId, token }) => (dispatch) => {
  dispatch(fetchModulesStart({ courseId }));

  api.getModules({ courseId, token }, (json) => {
    if (json.statusCode === 200) {
      dispatch(fetchModulesSuccess({ courseId, modules: json.payload }));
    }
    else if (json.statusCode >= 400) {
      dispatch(fetchModulesError(json));
    }
  });
};
