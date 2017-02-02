
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

export const COURSE_UPDATE = 'COURSE_UPDATE';
export const COURSE_UPDATE_START = 'COURSE_UPDATE_START';
export const COURSE_UPDATE_SUCCESS = 'COURSE_UPDATE_SUCCESS';
export const COURSE_UPDATE_ERROR = 'COURSE_UPDATE_ERROR';

export const MODULE_CREATE_START = 'MODULE_CREATE_START';
export const MODULE_CREATE_SUCCESS = 'MODULE_CREATE_SUCCESS';
export const MODULE_CREATE_ERROR = 'MODULE_CREATE_ERROR';


export const MODULES_FETCH = 'MODULES_FETCH';
export const MODULES_FETCH_START = 'MODULES_FETCH_START';
export const MODULES_FETCH_SUCCESS = 'MODULES_FETCH_SUCCESS';
export const MODULES_FETCH_ERROR = 'MODULES_FETCH_ERROR';

export const MODULE_FETCH = 'MODULE_FETCH';
export const MODULE_FETCH_START = 'MODULE_FETCH_START';
export const MODULE_FETCH_SUCCESS = 'MODULE_FETCH_SUCCESS';
export const MODULE_FETCH_ERROR = 'MODULE_FETCH_ERROR';

export const MODULE_UPDATE = 'MODULE_UPDATE';
export const MODULE_UPDATE_START = 'MODULE_UPDATE_START';
export const MODULE_UPDATE_SUCCESS = 'MODULE_UPDATE_SUCCESS';
export const MODULE_UPDATE_ERROR = 'MODULE_UPDATE_ERROR';


const fetchCourseStart = payload => ({ type: COURSE_FETCH_START, payload });
const fetchCourseSuccess = payload => ({ type: COURSE_FETCH_SUCCESS, payload });
const fetchCourseError = payload => ({ type: COURSE_FETCH_ERROR, payload });
export const fetchCourse = ({ courseId, token }) => (dispatch) => {
  dispatch(fetchCourseStart({ courseId: parseInt(courseId, 10) }));

  api.getCourse({ courseId, token }, (json) => {
    if (json.statusCode === 200) {
      dispatch(fetchCourseSuccess({ ...json.payload, courseId: parseInt(courseId, 10) }));
    }
    else if (json.statusCode >= 400) {
      dispatch(fetchCourseError({ courseId: parseInt(courseId, 10), ...json }));
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

const createModuleStart = payload => ({ type: MODULE_CREATE_START, payload });
const createModuleSuccess = payload => ({ type: MODULE_CREATE_SUCCESS, payload });
const createModuleError = payload => ({ type: MODULE_CREATE_ERROR, payload });
export const createModule = ({ id, token, courseId, moduleName }) => (dispatch) => {
  dispatch(createModuleStart({ courseId }));

  api.createModule({ id, token, courseId, moduleName }, (json) => {
    // TODO: fix server API to send only 201 as statusCode for creating any thing.
    if (json.statusCode === 201 || json.statusCode === 200) {
      dispatch(createModuleSuccess({ courseId, ...json.payload }));
    }
    else if (json.statusCode >= 400) {
      dispatch(createModuleError({ courseId, ...json }));
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
