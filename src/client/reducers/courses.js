/**
 * Created by himank on 6/8/16.
 */
"use strict";
import {
  COURSE_CREATE, COURSE_CREATE_START, COURSE_CREATE_ERROR, COURSE_CREATE_SUCCESS,
  COURSES_FETCH, COURSES_FETCH_START, COURSES_FETCH_ERROR, COURSES_FETCH_SUCCESS,
  COURSE_FETCH,  COURSE_FETCH_START,  COURSE_FETCH_ERROR,  COURSE_FETCH_SUCCESS,
  COURSE_UPDATE, COURSE_UPDATE_START, COURSE_UPDATE_ERROR, COURSE_UPDATE_SUCCESS,
  COURSE_DELETE, COURSE_DELETE_START, COURSE_DELETE_ERROR, COURSE_DELETE_SUCCESS,

  MODULE_CREATE, MODULE_CREATE_START, MODULE_CREATE_ERROR, MODULE_CREATE_SUCCESS,
  MODULES_FETCH, MODULES_FETCH_START, MODULES_FETCH_ERROR, MODULES_FETCH_SUCCESS,
  MODULE_FETCH,  MODULE_FETCH_START,  MODULE_FETCH_ERROR,  MODULE_FETCH_SUCCESS,
  MODULE_UPDATE, MODULE_UPDATE_START, MODULE_UPDATE_ERROR, MODULE_UPDATE_SUCCESS,
  MODULE_DELETE, MODULE_DELETE_START, MODULE_DELETE_ERROR, MODULE_DELETE_SUCCESS
} from '../actions/courses';

let initialModuleState  = {
  courseId  : -1,
  moduleId  : -1,
  moduleName: '',
  moduleData: {},

  isCreating  : false,
  isUpdating  : false,
  isFetching  : false,
  isDeleting  : false,

  isCreated   : false,
  isUpdated   : false,
  isFetched   : false,
  isDeleted   : false,

  isError     : false,
  error       : '',
  message     : '',
  lastUpdated : Date.now()
};
let initialCourseState  = {
  courseId    : -1,
  courseName  : '',
  description : '',
  level       : 1,
  standard    : 'graduation',
  modules     : [],

  isCreating  : false,
  isUpdating  : false,
  isFetching  : false,
  isDeleting  : false,

  isCreated   : false,
  isUpdated   : false,
  isFetched   : false,
  isDeleted   : false,

  isError     : false,
  error       : '',
  message     : '',
  lastUpdated : Date.now()
};
let initialCoursesState = {
  array       : [],

  isCreating  : false,
  isUpdating  : false,
  isFetching  : false,
  isDeleting  : false,

  isCreated   : false,
  isUpdated   : false,
  isFetched   : false,
  isDeleted   : false,

  isError     : false,
  error       : '',
  message     : '',

  lastUpdated : Date.now()
};

const moduleReducer = (state = initialModuleState, action) => {
  switch (action.type) {
    case MODULE_CREATE_SUCCESS: {
      return {
        ...state,
        ...action.payload,

        isCreating  : false,
        isUpdating  : false,
        isFetching  : false,
        isDeleting  : false,

        isCreated   : true,
        isUpdated   : false,
        isFetched   : false,
        isDeleted   : false,

        isError     : false,
        error       : '',
        message     : '',
        lastUpdated : Date.now()
      };
    }

    case MODULE_FETCH_START: {
      return {
        ...state,
        isCreating  : false,
        isUpdating  : false,
        isFetching  : true,
        isDeleting  : false,

        isCreated   : false,
        isUpdated   : false,
        isFetched   : false,
        isDeleted   : false,

        isError     : false,
        error       : '',
        message     : '',
        lastUpdated : Date.now()
      };
    }
    case MODULE_FETCH_ERROR: {
      return {
        ...state,
        isCreating  : false,
        isUpdating  : false,
        isFetching  : false,
        isDeleting  : false,

        isCreated   : false,
        isUpdated   : false,
        isFetched   : false,
        isDeleted   : false,

        isError     : true,
        error       : action.payload.error,
        message     : action.payload.message,
        lastUpdated : Date.now()
      };
    }
    case MODULE_FETCH_SUCCESS: {
      return {
        ...state,
        ...action.payload,

        isCreating  : false,
        isUpdating  : false,
        isFetching  : false,
        isDeleting  : false,

        isCreated   : false,
        isUpdated   : false,
        isFetched   : true,
        isDeleted   : false,

        isError     : false,
        error       : '',
        message     : '',
        lastUpdated : Date.now()
      };
    }

    case MODULE_UPDATE_START: {
      return {
        ...state,
        isCreating  : false,
        isUpdating  : true,
        isFetching  : false,
        isDeleting  : false,

        isCreated   : false,
        isUpdated   : false,
        isFetched   : false,
        isDeleted   : false,

        isError     : false,
        error       : '',
        message     : '',
        lastUpdated : Date.now()
      };
    }
    case MODULE_UPDATE_ERROR: {
      return {
        ...state,
        isCreating  : false,
        isUpdating  : false,
        isFetching  : false,
        isDeleting  : false,

        isCreated   : false,
        isUpdated   : false,
        isFetched   : false,
        isDeleted   : false,

        isError     : true,
        error       : action.payload.error,
        message     : action.payload.message,
        lastUpdated : Date.now()
      };
    }
    case MODULE_UPDATE_SUCCESS: {
      return {
        ...state,
        ...action.payload,

        isCreating  : false,
        isUpdating  : false,
        isFetching  : false,
        isDeleting  : false,

        isCreated   : false,
        isUpdated   : true,
        isFetched   : false,
        isDeleted   : false,

        isError     : false,
        error       : '',
        message     : '',
        lastUpdated : Date.now()
      };
    }

    case MODULE_DELETE_START: {
      return {
        ...state,
        isCreating  : false,
        isUpdating  : false,
        isFetching  : false,
        isDeleting  : true,

        isCreated   : false,
        isUpdated   : false,
        isFetched   : false,
        isDeleted   : false,

        isError     : false,
        error       : '',
        message     : '',
        lastUpdated : Date.now()
      };
    }
    case MODULE_DELETE_ERROR: {
      return {
        ...state,
        isCreating  : false,
        isUpdating  : false,
        isFetching  : true,
        isDeleting  : false,

        isCreated   : false,
        isUpdated   : false,
        isFetched   : false,
        isDeleted   : false,

        isError     : true,
        error       : action.payload.error,
        message     : action.payload.message,
        lastUpdated : Date.now()
      };
    }

    default:
      return state;
  }
};

const courseReducer = (state = initialCourseState, action) => {
  switch (action.type) {
    case COURSE_CREATE_SUCCESS: {
      return {
        ...state,
        ...action.payload,

        isCreating  : false,
        isUpdating  : false,
        isFetching  : false,
        isDeleting  : false,

        isCreated   : true,
        isUpdated   : false,
        isFetched   : false,
        isDeleted   : false,

        isError     : false,
        error       : '',
        message     : '',
        lastUpdated : Date.now()
      };
    }

    case COURSE_FETCH_START: {
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

        isError     : false,
        error       : '',
        message     : '',
        lastUpdated : Date.now()
      };
    }
    case COURSE_FETCH_ERROR: {
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
        error: action.error,
        message: action.message,
        lastUpdated: Date.now()
      };
    }
    case COURSE_FETCH_SUCCESS: {
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
        lastUpdated: Date.now()
      };
    }

    case COURSE_UPDATE_START: {
      return {
        ...state,
        ...action.payload,

        isCreating  : false,
        isUpdating  : true,
        isFetching  : false,
        isDeleting  : false,

        isCreated   : false,
        isUpdated   : false,
        isFetched   : false,
        isDeleted   : false,

        isError     : false,
        error       : '',
        message     : '',
        lastUpdated : Date.now()
      };
    }
    case COURSE_UPDATE_ERROR: {
      return {
        ...state,

        isCreating  : false,
        isUpdating  : false,
        isFetching  : false,
        isDeleting  : false,

        isCreated   : false,
        isUpdated   : false,
        isFetched   : false,
        isDeleted   : false,

        isError     : true,
        error       : action.payload.error,
        message     : action.payload.message,
        lastUpdated : Date.now()
      };
    }
    case COURSE_UPDATE_SUCCESS: {
      return {
        ...state,
        ...action.payload,

        isCreating  : false,
        isUpdating  : false,
        isFetching  : false,
        isDeleting  : false,

        isCreated   : false,
        isUpdated   : true,
        isFetched   : false,
        isDeleted   : false,

        isError     : false,
        error       : '',
        message     : '',
        lastUpdated : Date.now()
      };
    }

    case MODULE_CREATE_START: {
      return {
        ...state,

        isCreating  : true,
        isUpdating  : false,
        isFetching  : false,
        isDeleting  : false,

        isCreated   : false,
        isUpdated   : false,
        isFetched   : false,
        isDeleted   : false,

        isError     : false,
        error       : '',
        message     : '',
        lastUpdated : Date.now()
      };
    }
    case MODULE_CREATE_ERROR: {
      return {
        ...state,

        isCreating  : false,
        isUpdating  : false,
        isFetching  : false,
        isDeleting  : false,

        isCreated   : false,
        isUpdated   : false,
        isFetched   : false,
        isDeleted   : false,

        isError     : true,
        error       : action.payload.error,
        message     : action.payload.message,
        lastUpdated : Date.now()
      };
    }
    case MODULE_CREATE_SUCCESS: {
      return {
        ...state,
        modules: [
          ...state.modules,
          moduleReducer(undefined, action)
        ],
        isCreating  : false,
        isUpdating  : false,
        isFetching  : false,
        isDeleting  : false,

        isCreated   : true,
        isUpdated   : false,
        isFetched   : false,
        isDeleted   : false,

        isError     : false,
        error       : '',
        message     : '',
        lastUpdated : Date.now()
      };
    }

    case MODULES_FETCH_START: {
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

        isError    : false,
        error      : '',
        message    : '',
        lastUpdated: Date.now()
      };
    }
    case MODULES_FETCH_ERROR: {
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

        isError    : true,
        error      : action.payload.error,
        message    : action.payload.message,
        lastUpdated: Date.now()
      };
    }
    case MODULES_FETCH_SUCCESS: {
      return {
        ...state,
        modules: [
          ...state.modules,
          ...action.payload.modules.map(module => moduleReducer(undefined, {type: MODULE_FETCH_SUCCESS, payload: module}))
        ],
        isCreating  : false,
        isUpdating  : false,
        isFetching  : false,
        isDeleting  : false,

        isCreated   : false,
        isUpdated   : false,
        isFetched   : true,
        isDeleted   : false,

        isError     : false,
        error       : '',
        message     : '',
        lastUpdated : Date.now()
      };
    }

    case MODULE_FETCH_START: {
      let index = state.modules.findIndex(module => module.moduleId == action.payload.moduleId);

      return {
        ...state,
        modules: [
          ...state.modules.slice(0, index),
          moduleReducer(state.modules[index], action),
          ...state.modules.slice(index + 1, state.modules.length)
        ],
        lastUpdated : Date.now()
      };
    }
    case MODULE_FETCH_ERROR: {
      let index = state.modules.findIndex(module => module.moduleId == action.payload.moduleId);

      return {
        ...state,
        modules: [
          ...state.modules.slice(0, index),
          moduleReducer(state.modules[index], action),
          ...state.modules.slice(index + 1, state.modules.length)
        ],
        lastUpdated : Date.now()
      };
    }
    case MODULE_FETCH_SUCCESS: {
      let index = state.modules.findIndex(module => module.moduleId == action.payload.moduleId);

      return {
        ...state,
        modules: [
          ...state.modules.slice(0, index),
          moduleReducer(state.modules[index], action),
          ...state.modules.slice(index + 1, state.modules.length)
        ],
        lastUpdated : Date.now()
      };
    }

    case MODULE_UPDATE_START: {
      let index = state.modules.findIndex(module => module.moduleId == action.payload.moduleId);

      return {
        ...state,
        modules: [
          ...state.modules.slice(0, index),
          moduleReducer(state.modules[index], action),
          ...state.modules.slice(index + 1, state.modules.length)
        ],
        lastUpdated : Date.now()
      };
    }
    case MODULE_UPDATE_ERROR: {
      let index = state.modules.findIndex(module => module.moduleId == action.payload.moduleId);

      return {
        ...state,
        modules: [
          ...state.modules.slice(0, index),
          moduleReducer(state.modules[index], action),
          ...state.modules.slice(index + 1, state.modules.length)
        ],
        lastUpdated : Date.now()
      };
    }
    case MODULE_UPDATE_SUCCESS: {
      let index = state.modules.findIndex(module => module.moduleId == action.payload.moduleId);

      return {
        ...state,
        modules: [
          ...state.modules.slice(0, index),
          moduleReducer(state.modules[index], action),
          ...state.modules.slice(index + 1, state.modules.length)
        ],
        lastUpdated : Date.now()
      };
    }

    case MODULE_DELETE_START: {
      let index = state.modules.findIndex(module => module.moduleId == action.payload.moduleId);

      return {
        ...state,
        modules: [
          ...state.modules.slice(0, index),
          moduleReducer(state.modules[index], action),
          ...state.modules.slice(index + 1, state.modules.length)
        ],
        lastUpdated : Date.now()
      };
    }
    case MODULE_DELETE_ERROR: {
      let index = state.modules.findIndex(module => module.moduleId == action.payload.moduleId);

      return {
        ...state,
        modules: [
          ...state.modules.slice(0, index),
          moduleReducer(state.modules[index], action),
          ...state.modules.slice(index + 1, state.modules.length)
        ],
        lastUpdated : Date.now()
      };
    }
    case MODULE_DELETE_SUCCESS: {
      let index = state.modules.findIndex(module => module.moduleId == action.payload.moduleId);

      return {
        ...state,
        modules: [
          ...state.modules.slice(0, index),
          ...state.modules.slice(index + 1, state.modules.length)
        ],
        lastUpdated : Date.now()
      };
    }

    default:
      return state;
  }
};

const coursesReducer = (state = initialCoursesState, action) => {
  switch (action.type) {
    case COURSE_CREATE_START: {
      return {
        ...state,
        isCreating: true,
        isUpdating: false,
        isFetching: false,
        isDeleting: false,

        isCreated: false,
        isUpdated: false,
        isFetched: false,
        isDeleted: false,

        isError : false,
        error   : '',
        message : '',

        lastUpdated: Date.now()
      };
    }
    case COURSE_CREATE_ERROR: {
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
        error  : action.payload.error,
        message: action.payload.message,

        lastUpdated : Date.now()
      };
    }
    case COURSE_CREATE_SUCCESS: {
      return {
        ...state,
        array: [
          ...array,
          courseReducer(undefined, action)
        ],
        isCreating  : false,
        isUpdating  : false,
        isFetching  : false,
        isDeleting  : false,

        isCreated   : true,
        isUpdated   : false,
        isFetched   : false,
        isDeleted   : false,

        isError     : false,
        error       : '',
        message     : '',

        lastUpdated : Date.now()
      };
    }

    case COURSES_FETCH_START: {
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

        isError : false,
        error   : '',
        message : '',

        lastUpdated : Date.now()
      };
    }
    case COURSES_FETCH_ERROR: {
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
        error  : action.payload.error,
        message: action.payload.message,

        lastUpdated: Date.now()
      };
    }
    case COURSES_FETCH_SUCCESS: {
      action.payload = action.payload.map(course => courseReducer(undefined, {type: COURSE_FETCH_SUCCESS, payload: course}));

      return {
        ...state,
        array: [
          ...state.array,
          ...action.payload
        ],
        isCreating  : false,
        isUpdating  : false,
        isFetching  : false,
        isDeleting  : false,

        isCreated   : false,
        isUpdated   : false,
        isFetched   : true,
        isDeleted   : false,

        isError     : false,
        error       : '',
        message     : '',

        lastUpdated : Date.now()
      };
    }

    case COURSE_FETCH_START: {
      return {
        ...state,
        array: [
          ...state.array,
          courseReducer(undefined, action)
        ],
        lastUpdated : Date.now()
      };
    }
    case COURSE_FETCH_ERROR: {
      let index = state.array.findIndex(course => course.courseId == action.payload.courseId);

      return {
        ...state,
        array: [
          ...state.array.slice(0, index),
          courseReducer(state.array[index], action),
          ...state.array.slice(index + 1, state.array.length)
        ],
        lastUpdated : Date.now()
      };
    }
    case COURSE_FETCH_SUCCESS: {
      let index = state.array.findIndex(course => course.courseId == action.payload.courseId);

      return {
        ...state,
        array: [
          ...state.array.slice(0, index),
          courseReducer(state.array[index], action),
          ...state.array.slice(index + 1, state.array.length)
        ],
        lastUpdated : Date.now()
      };
    }

    case COURSE_UPDATE_START: {
      let index = state.array.findIndex(course => course.courseId == action.payload.courseId);

      return {
        ...state,
        array: [
          ...state.array.slice(0, index),
          courseReducer(state.array[index], action),
          ...state.array.slice(index + 1, state.array.length)
        ],
        lastUpdated : Date.now()
      };
    }
    case COURSE_UPDATE_ERROR: {
      let index = state.array.findIndex(course => course.courseId == action.payload.courseId);

      return {
        ...state,
        array: [
          ...state.array.slice(0, index),
          courseReducer(state.array[index], action),
          ...state.array.slice(index + 1, state.array.length)
        ],
        lastUpdated : Date.now()
      };
    }
    case COURSE_UPDATE_SUCCESS: {
      let index = state.array.findIndex(course => course.courseId == action.payload.courseId);

      return {
        ...state,
        array: [
          ...state.array.slice(0, index),
          courseReducer(state.array[index], action),
          ...state.array.slice(index + 1, state.array.length)
        ],
        lastUpdated : Date.now()
      };
    }

    case COURSE_DELETE_START: {

      return state;
    }
    case COURSE_DELETE_ERROR: {

      return state;
    }
    case COURSE_DELETE_SUCCESS: {

      return state;
    }


    case MODULE_CREATE_START: {
      let index = state.array.findIndex(course => course.courseId == action.payload.courseId);

      return {
        ...state,
        array: [
          ...state.array.slice(0, index),
          courseReducer(state.array[index], action),
          ...state.array.slice(index + 1, state.array.length)
        ],
        lastUpdated : Date.now()
      };
    }
    case MODULE_CREATE_ERROR: {
      let index = state.array.findIndex(course => course.courseId == action.payload.courseId);

      return {
        ...state,
        array: [
          ...state.array.slice(0, index),
          courseReducer(state.array[index], action),
          ...state.array.slice(index + 1, state.array.length)
        ],
        lastUpdated : Date.now()
      };
    }
    case MODULE_CREATE_SUCCESS: {
      let index = state.array.findIndex(course => course.courseId == action.payload.courseId);

      return {
        ...state,
        array: [
          ...state.array.slice(0, index),
          courseReducer(state.array[index], action),
          ...state.array.slice(index + 1, state.array.length)
        ],
        lastUpdated : Date.now()
      };
    }

    case MODULES_FETCH_START: {
      let index = state.array.findIndex(course => course.courseId == action.payload.courseId);

      return {
        ...state,
        array: [
          ...state.array.slice(0, index),
          courseReducer(state.array[index], action),
          ...state.array.slice(index + 1, state.array.length)
        ],
        lastUpdated : Date.now()
      };
    }
    case MODULES_FETCH_ERROR: {
      let index = state.array.findIndex(course => course.courseId == action.payload.courseId);

      return {
        ...state,
        array: [
          ...state.array.slice(0, index),
          courseReducer(state.array[index], action),
          ...state.array.slice(index + 1, state.array.length)
        ],
        lastUpdated : Date.now()
      };
    }
    case MODULES_FETCH_SUCCESS: {
      let index = state.array.findIndex(course => course.courseId == action.payload.courseId);

      return {
        ...state,
        array: [
          ...state.array.slice(0, index),
          courseReducer(state.array[index], action),
          ...state.array.slice(index + 1, state.array.length)
        ],
        lastUpdated : Date.now()
      };
    }

    case MODULE_FETCH_START: {
      let index = state.array.findIndex(course => course.courseId == action.payload.courseId);

      return {
        ...state,
        array: [
          ...state.array.slice(0, index),
          courseReducer(state.array[index], action),
          ...state.array.slice(index + 1, state.array.length)
        ],
        lastUpdated : Date.now()
      };
    }
    case MODULE_FETCH_ERROR: {
      let index = state.array.findIndex(course => course.courseId == action.payload.courseId);

      return {
        ...state,
        array: [
          ...state.array.slice(0, index),
          courseReducer(state.array[index], action),
          ...state.array.slice(index + 1, state.array.length)
        ],
        lastUpdated : Date.now()
      };
    }
    case MODULE_FETCH_SUCCESS: {
      let index = state.array.findIndex(course => course.courseId == action.payload.courseId);

      return {
        ...state,
        array: [
          ...state.array.slice(0, index),
          courseReducer(state.array[index], action),
          ...state.array.slice(index + 1, state.array.length)
        ],
        lastUpdated : Date.now()
      };
    }

    case MODULE_UPDATE_START: {
      let index = state.array.findIndex(course => course.courseId == action.payload.courseId);

      return {
        ...state,
        array: [
          ...state.array.slice(0, index),
          courseReducer(state.array[index], action),
          ...state.array.slice(index + 1, state.array.length)
        ],
        lastUpdated : Date.now()
      };
    }
    case MODULE_UPDATE_ERROR: {
      let index = state.array.findIndex(course => course.courseId == action.payload.courseId);

      return {
        ...state,
        array: [
          ...state.array.slice(0, index),
          courseReducer(state.array[index], action),
          ...state.array.slice(index + 1, state.array.length)
        ],
        lastUpdated : Date.now()
      };
    }
    case MODULE_UPDATE_SUCCESS: {
      let index = state.array.findIndex(course => course.courseId == action.payload.courseId);

      return {
        ...state,
        array: [
          ...state.array.slice(0, index),
          courseReducer(state.array[index], action),
          ...state.array.slice(index + 1, state.array.length)
        ],
        lastUpdated : Date.now()
      };
    }

    case MODULE_DELETE_START: {
      let index = state.array.findIndex(course => course.courseId == action.payload.courseId);

      return {
        ...state,
        array: [
          ...state.array.slice(0, index),
          courseReducer(state.array[index], action),
          ...state.array.slice(index + 1, state.array.length)
        ],
        lastUpdated : Date.now()
      };
    }
    case MODULE_DELETE_ERROR: {
      let index = state.array.findIndex(course => course.courseId == action.payload.courseId);

      return {
        ...state,
        array: [
          ...state.array.slice(0, index),
          courseReducer(state.array[index], action),
          ...state.array.slice(index + 1, state.array.length)
        ],
        lastUpdated : Date.now()
      };
    }
    case MODULE_DELETE_SUCCESS: {
      let index = state.array.findIndex(course => course.courseId == action.payload.courseId);

      return {
        ...state,
        array: [
          ...state.array.slice(0, index),
          courseReducer(state.array[index], action),
          ...state.array.slice(index + 1, state.array.length)
        ],
        lastUpdated : Date.now()
      };
    }

    default:
      return state;
  }
};

export default coursesReducer;