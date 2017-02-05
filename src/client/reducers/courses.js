
import _ from 'lodash';

import {
  COURSE_CREATE_START, COURSE_CREATE_ERROR, COURSE_CREATE_SUCCESS,
  COURSES_FETCH_START, COURSES_FETCH_ERROR, COURSES_FETCH_SUCCESS,
  COURSE_FETCH_START, COURSE_FETCH_ERROR, COURSE_FETCH_SUCCESS,

  COURSE_UPDATE_START, COURSE_UPDATE_ERROR, COURSE_UPDATE_SUCCESS,

  MODULE_CREATE_START, MODULE_CREATE_ERROR, MODULE_CREATE_SUCCESS,
  MODULES_FETCH_START, MODULES_FETCH_ERROR, MODULES_FETCH_SUCCESS,
  MODULE_FETCH_START, MODULE_FETCH_ERROR, MODULE_FETCH_SUCCESS,
} from '../actions/courses';

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
  courseId: -1,
  courseName: '',
  description: '',
  level: 0,
  standard: '',
  modules: [],

  isCreating: false,
  isUpdating: false,
  isFetching: false,
  isDeleting: false,

  isCreated: false,
  isUpdated: false,
  isFetched: false,
  isDeleted: false,

  isModulesFetching: false,
  isModulesFetched: false,

  statusCode: 200,
  isError: false,
  error: '',
  message: '',
  lastUpdated: Date.now(),
};
const initialCoursesState = {
  array: [],

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

    case MODULE_FETCH_START: {
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
    case MODULE_FETCH_ERROR: {
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
    case MODULE_FETCH_SUCCESS: {
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
    case COURSE_CREATE_SUCCESS: {
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

        statusCode: 200,
        isError: false,
        error: '',
        message: '',
        lastUpdated: Date.now(),
      };
    }
    case COURSE_FETCH_ERROR: {
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

        statusCode: 200,
        isError: false,
        error: '',
        message: '',
        lastUpdated: Date.now(),
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
        isCreating: true,
        isUpdating: false,
        isFetching: false,
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
    case MODULE_CREATE_ERROR: {
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
    case MODULE_CREATE_SUCCESS: {
      return {
        ...state,
        modules: [
          ...state.modules,
          moduleReducer(undefined, action),
        ],
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

        isModulesFetching: true,
        isModulesFetched: false,

        statusCode: 200,
        isError: false,
        error: '',
        message: '',
        lastUpdated: Date.now(),
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

        statusCode: action.payload.statusCode,
        isError: true,
        error: action.payload.error,
        message: action.payload.message,
        lastUpdated: Date.now(),
      };
    }
    case MODULES_FETCH_SUCCESS: {
      let modules = [
        ...state.modules,
        ...action.payload.modules.map(module => moduleReducer(undefined, {
          type: MODULE_FETCH_SUCCESS,
          payload: module,
        })),
      ];

      modules = modules.map(m => ({
        ...m,
        moduleId: parseInt(m.moduleId, 10),
        courseId: parseInt(m.courseId, 10),
      }));
      modules = _.uniqBy(modules, 'moduleId');

      return {
        ...state,
        modules,
        isCreating: false,
        isUpdating: false,
        isFetching: false,
        isDeleting: false,

        isCreated: false,
        isUpdated: false,
        isFetched: true,
        isDeleted: false,

        isModulesFetching: false,
        isModulesFetched: true,

        isError: false,
        error: '',
        message: '',
        lastUpdated: Date.now(),
      };
    }

    case MODULE_FETCH_START: {
      const { moduleId } = action.payload;
      const index = state.modules.findIndex(module => module.moduleId === parseInt(moduleId, 10));

      return {
        ...state,
        modules: [
          ...state.modules.slice(0, index),
          moduleReducer(state.modules[index], action),
          ...state.modules.slice(index + 1, state.modules.length),
        ],
        lastUpdated: Date.now(),
      };
    }
    case MODULE_FETCH_ERROR: {
      const { moduleId } = action.payload;
      const index = state.modules.findIndex(module => module.moduleId === parseInt(moduleId, 10));

      return {
        ...state,
        modules: [
          ...state.modules.slice(0, index),
          moduleReducer(state.modules[index], action),
          ...state.modules.slice(index + 1, state.modules.length),
        ],
        lastUpdated: Date.now(),
      };
    }
    case MODULE_FETCH_SUCCESS: {
      const { moduleId } = action.payload;
      const index = state.modules.findIndex(module => module.moduleId === parseInt(moduleId, 10));

      return {
        ...state,
        modules: [
          ...state.modules.slice(0, index),
          moduleReducer(state.modules[index], action),
          ...state.modules.slice(index + 1, state.modules.length),
        ],
        lastUpdated: Date.now(),
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

        isError: false,
        error: '',
        message: '',

        lastUpdated: Date.now(),
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
        error: action.payload.error,
        message: action.payload.message,

        lastUpdated: Date.now(),
      };
    }
    case COURSE_CREATE_SUCCESS: {
      return {
        ...state,
        array: [
          ...state.array,
          courseReducer(undefined, action),
        ],
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

        isError: false,
        error: '',
        message: '',

        lastUpdated: Date.now(),
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

        statusCode: action.payload.statusCode,
        isError: true,
        error: action.payload.error,
        message: action.payload.message,

        lastUpdated: Date.now(),
      };
    }
    case COURSES_FETCH_SUCCESS: {
      const fetchedCourses = action.payload.map((course) => {
        return courseReducer(undefined, { type: COURSE_FETCH_SUCCESS, payload: course });
      });

      let array = [
        ...state.array,
        ...fetchedCourses,
      ];
      array = array.map(course => ({ ...course, courseId: parseInt(course.courseId, 10) }));
      array = _.uniqBy(array, 'courseId');

      return {
        ...state,
        array,
        isCreating: false,
        isUpdating: false,
        isFetching: false,
        isDeleting: false,

        isCreated: false,
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

    case COURSE_FETCH_START: {
      return {
        ...state,
        array: [
          ...state.array,
          courseReducer(undefined, action),
        ],
        lastUpdated: Date.now(),
      };
    }
    case COURSE_FETCH_ERROR: {
      const { courseId } = action.payload;
      const index = state.array.findIndex(c => c.courseId === parseInt(courseId, 10));

      return {
        ...state,
        array: [
          ...state.array.slice(0, index),
          courseReducer(state.array[index], action),
          ...state.array.slice(index + 1, state.array.length),
        ],
        lastUpdated: Date.now(),
      };
    }
    case COURSE_FETCH_SUCCESS: {
      const { courseId } = action.payload;
      const index = state.array.findIndex(c => c.courseId === parseInt(courseId, 10));

      return {
        ...state,
        array: [
          ...state.array.slice(0, index),
          courseReducer(state.array[index], action),
          ...state.array.slice(index + 1, state.array.length),
        ],
        lastUpdated: Date.now(),
      };
    }

    case COURSE_UPDATE_START: {
      const index = state.array.findIndex(c => c.courseId === action.payload.courseId);

      return {
        ...state,
        array: [
          ...state.array.slice(0, index),
          courseReducer(state.array[index], action),
          ...state.array.slice(index + 1, state.array.length),
        ],
        lastUpdated: Date.now(),
      };
    }
    case COURSE_UPDATE_ERROR: {
      const index = state.array.findIndex(c => c.courseId === action.payload.courseId);

      return {
        ...state,
        array: [
          ...state.array.slice(0, index),
          courseReducer(state.array[index], action),
          ...state.array.slice(index + 1, state.array.length),
        ],
        lastUpdated: Date.now(),
      };
    }
    case COURSE_UPDATE_SUCCESS: {
      const index = state.array.findIndex(c => c.courseId === action.payload.courseId);

      return {
        ...state,
        array: [
          ...state.array.slice(0, index),
          courseReducer(state.array[index], action),
          ...state.array.slice(index + 1, state.array.length),
        ],
        lastUpdated: Date.now(),
      };
    }

    case MODULE_CREATE_START: {
      const index = state.array.findIndex(c => c.courseId === action.payload.courseId);

      return {
        ...state,
        array: [
          ...state.array.slice(0, index),
          courseReducer(state.array[index], action),
          ...state.array.slice(index + 1, state.array.length),
        ],
        lastUpdated: Date.now(),
      };
    }
    case MODULE_CREATE_ERROR: {
      const index = state.array.findIndex(c => c.courseId === action.payload.courseId);

      return {
        ...state,
        array: [
          ...state.array.slice(0, index),
          courseReducer(state.array[index], action),
          ...state.array.slice(index + 1, state.array.length),
        ],
        lastUpdated: Date.now(),
      };
    }
    case MODULE_CREATE_SUCCESS: {
      const index = state.array.findIndex(c => c.courseId === action.payload.courseId);

      return {
        ...state,
        array: [
          ...state.array.slice(0, index),
          courseReducer(state.array[index], action),
          ...state.array.slice(index + 1, state.array.length),
        ],
        lastUpdated: Date.now(),
      };
    }


    case MODULES_FETCH_START: {
      const { courseId } = action.payload;
      const index = state.array.findIndex(c => c.courseId === parseInt(courseId, 10));

      return {
        ...state,
        array: [
          ...state.array.slice(0, index),
          courseReducer(state.array[index], action),
          ...state.array.slice(index + 1, state.array.length),
        ],
        lastUpdated: Date.now(),
      };
    }
    case MODULES_FETCH_ERROR: {
      const { courseId } = action.payload;
      const index = state.array.findIndex(c => c.courseId === parseInt(courseId, 10));

      return {
        ...state,
        array: [
          ...state.array.slice(0, index),
          courseReducer(state.array[index], action),
          ...state.array.slice(index + 1, state.array.length),
        ],
        lastUpdated: Date.now(),
      };
    }
    case MODULES_FETCH_SUCCESS: {
      const { courseId } = action.payload;
      const index = state.array.findIndex(c => c.courseId === parseInt(courseId, 10));

      return {
        ...state,
        array: [
          ...state.array.slice(0, index),
          courseReducer(state.array[index], action),
          ...state.array.slice(index + 1, state.array.length),
        ],
        lastUpdated: Date.now(),
      };
    }

    case MODULE_FETCH_START: {
      const { courseId } = action.payload;
      const index = state.array.findIndex(c => c.courseId === parseInt(courseId, 10));

      return {
        ...state,
        array: [
          ...state.array.slice(0, index),
          courseReducer(state.array[index], action),
          ...state.array.slice(index + 1, state.array.length),
        ],
        lastUpdated: Date.now(),
      };
    }
    case MODULE_FETCH_ERROR: {
      const { courseId } = action.payload;
      const index = state.array.findIndex(c => c.courseId === parseInt(courseId, 10));

      return {
        ...state,
        array: [
          ...state.array.slice(0, index),
          courseReducer(state.array[index], action),
          ...state.array.slice(index + 1, state.array.length),
        ],
        lastUpdated: Date.now(),
      };
    }
    case MODULE_FETCH_SUCCESS: {
      const { courseId } = action.payload;
      const index = state.array.findIndex(c => c.courseId === parseInt(courseId, 10));

      return {
        ...state,
        array: [
          ...state.array.slice(0, index),
          courseReducer(state.array[index], action),
          ...state.array.slice(index + 1, state.array.length),
        ],
        lastUpdated: Date.now(),
      };
    }

    default:
      return state;
  }
};

export default coursesReducer;
