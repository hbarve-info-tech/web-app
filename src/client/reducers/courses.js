
import _ from 'lodash';

import {
  COURSES_GET, COURSE_GET, COURSE_CREATE, COURSE_UPDATE, COURSE_DELETE,
  MODULES_GET, MODULE_GET, MODULE_CREATE, MODULE_UPDATE, MODULE_DELETE,
  QUESTIONS_GET, QUESTION_GET, QUESTION_CREATE, QUESTION_UPDATE, QUESTION_DELETE,

  COURSE_CREATE_SUCCESS,
  COURSES_GET_SUCCESS,
  COURSE_GET_START, COURSE_GET_ERROR, COURSE_GET_SUCCESS,

  MODULE_CREATE_START, MODULE_CREATE_ERROR, MODULE_CREATE_SUCCESS,
  MODULES_GET_START, MODULES_GET_ERROR, MODULES_GET_SUCCESS,
  MODULE_GET_START, MODULE_GET_ERROR, MODULE_GET_SUCCESS,
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
const initialQuestionState = {

  lastUpdated: Date.now(),
};
const initialCourseState = {
  modules: [],
  discussions: [],
  isUpdating: false,
  isFetching: false,
  isDeleting: false,

  isUpdated: false,
  isFetched: false,
  isDeleted: false,

  isModulesFetching: false,
  isModulesFetched: false,

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
        isUpdating: false,
        isFetching: false,
        isDeleting: false,

        isUpdated: false,
        isFetched: false,
        isDeleted: false,
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

const questionReducer = (state = initialQuestionState, action) => {
  switch (action.type) {
    case QUESTION_GET: {
      return {
        ...state,
        ...action.payload,

        lastUpdated: Date.now(),
      };
    }

    case QUESTION_CREATE: {
      return {
        ...state,
        ...action.payload,

        lastUpdated: Date.now(),
      };
    }

    case QUESTION_UPDATE: {
      return {
        ...state,
        ...action.payload,

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

        isUpdating: false,
        isFetching: false,
        isDeleting: false,

        isUpdated: false,
        isFetched: false,
        isDeleted: false,

        isError: false,
        error: '',
        message: '',
        lastUpdated: Date.now(),
      };
    }

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

    case MODULES_GET_START: {
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
    case MODULES_GET_ERROR: {
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
    case MODULES_GET_SUCCESS: {
      let modules = [
        ...state.modules,
        ...action.payload.modules.map(module => moduleReducer(undefined, {
          type: MODULE_GET_SUCCESS,
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

    case QUESTION_CREATE: {
      return {
        ...state,
        discussions: [
          ...state.discussions,
          questionReducer(undefined, action),
        ],
        lastUpdated: Date.now(),
      };
    }

    default:
      return state;
  }
};


const devCoursesState = [
  {
    courseId: 1,
    authorId: 1,
    rating: 4.5,
    level: 'beginner', // beginner, moderate, difficult.
    title: 'Introduction to Science',
    description: 'idsaf asdf ads f',
    detailedDescription: {}, //draft-js raw state.
    syllabus: undefined, //draft-js raw state
    modules: [
      {
        moduleId: 1,
        courseId: 1,
        authorId: 1,
        index: 1,
        title: 'Introduction',
        data: undefined,
        timestamp: undefined,
      },
      {
        moduleId: 2,
        courseId: 1,
        authorId: 1,
        index: 2,
        title: 'Chapter 1',
        data: undefined,
        timestamp: undefined,
      },
      {
        moduleId: 3,
        courseId: 1,
        authorId: 1,
        index: 4,
        title: 'Chapter 2',
        data: undefined,
        timestamp: undefined,
      },
      {
        moduleId: 4,
        courseId: 1,
        authorId: 1,
        index: 5,
        title: 'Chapter 3',
        data: undefined,
        timestamp: undefined,
      }
    ],
    discussion: [],
    questions: [],

    statusCode: 200,
  }
];

const coursesReducer = (state = [], action) => {
  switch (action.type) {
    case COURSE_CREATE_SUCCESS: {
      return [
        courseReducer(undefined, action),
        ...state,
      ];
    }


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


    case MODULES_GET_START: {
      const { courseId } = action.payload;
      const index = state.findIndex(c => c.courseId === courseId);

      return [
        ...state.slice(0, index),
        courseReducer(state[index], action),
        ...state.slice(index + 1, state.length),
      ];
    }
    case MODULES_GET_ERROR: {
      const { courseId } = action.payload;
      const index = state.findIndex(c => c.courseId === parseInt(courseId, 10));

      return [
        ...state.slice(0, index),
        courseReducer(state[index], action),
        ...state.slice(index + 1, state.length),
      ];
    }
    case MODULES_GET_SUCCESS: {
      const { courseId } = action.payload;
      const index = state.findIndex(c => c.courseId === parseInt(courseId, 10));

      return [
        ...state.slice(0, index),
        courseReducer(state[index], action),
        ...state.slice(index + 1, state.length),
      ];
    }


    case MODULE_CREATE_SUCCESS: {
      const { courseId } = action.payload;
      const index = state.findIndex(c => c.courseId === courseId);

      return [
        ...state.slice(0, index),
        courseReducer(state[index], action),
        ...state.slice(index + 1, state.length),
      ];
    }

    case QUESTION_CREATE: {
      const { courseId } = action.payload;
      const index = state.findIndex(c => c.courseId === courseId);

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
