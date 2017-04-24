
import _ from 'lodash';

import {
  COURSES_GET_SUCCESS,
  COURSE_GET_START, COURSE_GET_ERROR, COURSE_GET_SUCCESS,
} from '../constants/courses';

const initialModuleState = {
  courseId: -1,
  moduleId: -1,
  moduleName: '',
  moduleData: {},

  isCreating: false,
  isUpdating: false,
  isFetching: false,
  isDeleting: false,

  isCreated: false,
  isUpdated: false,
  isFetched: false,
  isDeleted: false,

  statusCode: 200,
  isError: false,
  error: '',
  message: '',
  lastUpdated: Date.now(),
};
const initialCourseState = {
  isUpdating: false,
  isFetching: false,
  isDeleting: false,

  isUpdated: false,
  isFetched: false,
  isDeleted: false,

  statusCode: null,
  isError: false,
  error: '',
  message: '',
  lastUpdated: Date.now(),
};


const moduleReducer = (state = initialModuleState, action) => {
  switch (action.type) {
    case MODULE_CREATE_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        isCreating: false,
        isUpdating: false,
        isFetching: false,
        isDeleting: false,
        isCreated: true,
        isUpdated: false,
        isFetched: false,
        isDeleted: false,
        isError: false,
        error: '',
        message: '',
        lastUpdated: Date.now(),
      };
    }

    case MODULE_GET_START: {
      return {
        ...state,
        isCreating: false,
        isUpdating: false,
        isFetching: true,
        isDeleting: false,

        isCreated: false,
        isUpdated: false,
        isFetched: false,
        isDeleted: false,

        isError: false,
        error: '',
        message: '',
        lastUpdated: Date.now(),
      };
    }
    case MODULE_GET_ERROR: {
      return {
        ...state,
        isCreating: false,
        isUpdating: false,
        isFetching: false,
        isDeleting: false,

        isCreated: false,
        isUpdated: false,
        isFetched: false,
        isDeleted: false,

        isError: true,
        error: action.payload.error,
        message: action.payload.message,
        lastUpdated: Date.now(),
      };
    }
    case MODULE_GET_SUCCESS: {
      return {
        ...state,
        ...action.payload,

        isCreating: false,
        isUpdating: false,
        isFetching: false,
        isDeleting: false,

        isCreated: false,
        isUpdated: false,
        isFetched: true,
        isDeleted: false,

        isError: false,
        error: '',
        message: '',
        lastUpdated: Date.now(),
      };
    }

    default:
      return state;
  }
};

const courseReducer = (state = initialCourseState, action) => {
  switch (action.type) {
    case COURSE_GET_START: {
      return {
        ...state,
        ...action.payload,

        isCreating: false,
        isUpdating: false,
        isFetching: true,
        isDeleting: false,

        isCreated: false,
        isUpdated: false,
        isFetched: false,
        isDeleted: false,

        statusCode: null,
        isError: false,
        error: '',
        message: '',
        lastUpdated: Date.now(),
      };
    }
    case COURSE_GET_ERROR: {
      return {
        ...state,
        ...action.payload,

        isCreating: false,
        isUpdating: false,
        isFetching: false,
        isDeleting: false,

        isCreated: false,
        isUpdated: false,
        isFetched: false,
        isDeleted: false,

        isError: true,
        lastUpdated: Date.now(),
      };
    }
    case COURSE_GET_SUCCESS: {
      return {
        ...state,
        ...action.payload,

        isUpdating: false,
        isFetching: false,
        isDeleting: false,

        isUpdated: false,
        isFetched: true,
        isDeleted: false,

        statusCode: 200,
        isError: false,
        error: '',
        message: '',
        lastUpdated: Date.now(),
      };
    }

    default:
      return state;
  }
};

const coursesReducer = (state = [], action) => {
  switch (action.type) {
    case COURSES_GET_SUCCESS: {
      const { payload } = action;

      let courses = payload.map(c => courseReducer(undefined, {type: COURSE_GET_SUCCESS, payload: c }));

      courses = [
        ...state,
        ...courses
      ];
      courses = courses.map(course => ({ ...course, courseId: parseInt(course.courseId, 10) }));
      courses = _.uniqBy(courses, 'courseId');

      return courses;
    }

    case COURSE_GET_START: {
      return [
        ...state,
        courseReducer(undefined, action),
      ];
    }
    case COURSE_GET_ERROR: {
      const { courseId } = action.payload;
      const index = state.findIndex(c => c.courseId === parseInt(courseId, 10));

      return [
        ...state.slice(0, index),
        courseReducer(state[index], action),
        ...state.slice(index + 1, state.length),
      ];
    }
    case COURSE_GET_SUCCESS: {
      const { courseId } = action.payload;
      const index = state.findIndex(c => c.courseId === parseInt(courseId, 10));

      return [
        ...state.slice(0, index),
        courseReducer(state[index], action),
        ...state.slice(index + 1, state.length),
      ];
    }

    default:
      return state;
  }
};

export default coursesReducer;
