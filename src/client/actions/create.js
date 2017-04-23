
import api from '../api/post';


export const POST_CREATE_START = 'POST_CREATE_START';
export const POST_CREATE_SUCCESS = 'POST_CREATE_SUCCESS';
export const POST_CREATE_ERROR = 'POST_CREATE_ERROR';

export const COURSE_CREATE_START = 'COURSE_CREATE_START';
export const COURSE_CREATE_SUCCESS = 'COURSE_CREATE_SUCCESS';
export const COURSE_CREATE_ERROR = 'COURSE_CREATE_ERROR';

export const MODULE_CREATE_START = 'MODULE_CREATE_START';
export const MODULE_CREATE_SUCCESS = 'MODULE_CREATE_SUCCESS';
export const MODULE_CREATE_ERROR = 'MODULE_CREATE_ERROR';



const createPostStart = () => ({ type: POST_CREATE_START });
const createPostSuccess = payload => ({ type: POST_CREATE_SUCCESS, payload });
const createPostError = payload => ({ type: POST_CREATE_ERROR, payload });
export const createPost = ({ id, token, postType, title, description, data }) => (dispatch) => {
  dispatch(createPostStart());

  api.createPost({ id, token, postType, title, description, data }, (json) => {
    if (json.statusCode === 201) {
      dispatch(createPostSuccess({ ...json.payload, postType, title, description, data }));
    }
    else if (json.statusCode >= 400) {
      dispatch(createPostError(json));
    }
  });
};


const createCourseStart = () => ({ type: COURSE_CREATE_START });
const createCourseSuccess = payload => ({ type: COURSE_CREATE_SUCCESS, payload });
const createCourseError = payload => ({ type: COURSE_CREATE_ERROR, payload });
export const createCourse = ({ id, token, courseName }) => (dispatch) => {
  dispatch(createCourseStart());

  api.createCourse({ id, token, courseName }, (json) => {
    if (json.statusCode === 201) {
      dispatch(createCourseSuccess({ id, courseName, ...json.payload }));
    }
    else if (json.statusCode >= 400) {
      dispatch(createCourseError({ id, ...json }));
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