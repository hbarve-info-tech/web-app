
import { POST_CREATE_START, POST_CREATE_ERROR, POST_CREATE_SUCCESS,
  COURSE_CREATE_START, COURSE_CREATE_ERROR, COURSE_CREATE_SUCCESS,
  MODULE_CREATE_START, MODULE_CREATE_ERROR, MODULE_CREATE_SUCCESS,
} from '../actions/create';


const initialState = {
  post: {
    isCreating: false,
    isCreated: false,
    isError: false,
    statusCode: null,
    error: '',
    message: '',
  },
  course: {
    isCreating: false,
    isCreated: false,
    isError: false,
    statusCode: null,
    error: '',
    message: '',
  },
  module: {
    isCreating: false,
    isCreated: false,
    isError: false,
    statusCode: null,
    error: '',
    message: '',
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_CREATE_START: {
      return {
        ...state,
        post: {
          ...state.post,
          isCreating: true,
        },
      };
    }
    case POST_CREATE_ERROR: {
      return {
        ...state,
        post: {
          ...state.post,
          isCreating: false,
          isError: true,
          ...action.payload,
        },
      };
    }
    case POST_CREATE_SUCCESS: {
      return {
        ...state,
        post: {
          ...state.post,
          isCreating: false,
          isCreated: true,
          isError: false,
          ...action.payload,
        },
      };
    }

    case COURSE_CREATE_START: {
      return {
        ...initialState,
      };
    }
    case COURSE_CREATE_ERROR: {
      return {
        ...initialState,
      };
    }
    case COURSE_CREATE_SUCCESS: {
      return {
        ...initialState,
      };
    }

    case MODULE_CREATE_START: {
      return {
        ...initialState,
      };
    }
    case MODULE_CREATE_ERROR: {
      return {
        ...initialState,
      };
    }
    case MODULE_CREATE_SUCCESS: {
      return {
        ...initialState,
      };
    }

    default:
      return state;
  }
};
