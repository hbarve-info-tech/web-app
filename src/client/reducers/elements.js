
import {
  ELEMENT_GET_START, ELEMENT_GET_SUCCESS, ELEMENT_GET_ERROR,
  USER_SIGN_IN_START, USER_SIGN_IN_ERROR, USER_SIGN_IN_SUCCESS,
  // USER_FETCH_START, USER_FETCH_SUCCESS, USER_FETCH_ERROR,
  USER_SIGN_OUT,
} from '../actions/elements';

import { writeLocalStore, writeCookie,
  removeLocalStore, removeAllCookies } from '../api/clientApi';

export const initialElementState = {
  isFetching: false,
  isFetched: false,

  statusCode: null,
  isError: false,
  error: '',

  message: '',
  lastUpdated: Date.now(),
};
export const initialElementsState = [
  {
    ...initialElementState,
    isSignedIn: false,
    isSigningIn: false,
  },
];

const elementReducer = (state = initialElementState, action) => {
  switch (action.type) {
    case ELEMENT_GET_START: {
      return {
        ...state,
        ...action.payload,
        isFetching: true,
        lastUpdated: Date.now(),
      };
    }
    case ELEMENT_GET_ERROR: {
      return {
        ...state,
        isFetched: false,
        isFetching: true,
        isError: true,
        ...action.payload,
      };
    }
    case ELEMENT_GET_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        isFetching: false,
        isFetched: true,
        lastUpdated: Date.now(),
      };
    }

    default:
      return state;
  }
};

const elementsReducer = (state = initialElementsState, action) => {
  switch (action.type) {
    case USER_SIGN_IN_START: {
      return [
        {
          ...state[0],
          isSigningIn: true,
          isSignedIn: false,

          isFetching: false,
          isFetched: false,

          isError: false,
          error: '',
          message: '',

          lastUpdated: Date.now(),
        },
      ];
    }
    case USER_SIGN_IN_ERROR: {
      return [
        {
          ...state[0],
          isSigningIn: true,
          isSignedIn: false,

          isFetching: false,
          isFetched: false,

          isError: true,
          error: action.payload.error,
          message: action.payload.message,

          lastUpdated: Date.now(),
        },
      ];
    }
    case USER_SIGN_IN_SUCCESS: {
      const { payload } = action;

      writeLocalStore('user', payload);
      writeCookie('isSignedIn', true);
      writeCookie('id', payload.id);
      writeCookie('username', payload.username);
      writeCookie('token', payload.token);

      return [
        {
          ...state[0],
          ...payload,
          ...state[0],
          isSigningIn: false,
          isSignedIn: true,

          isFetching: false,
          isFetched: false,

          isError: false,
          error: '',
          message: '',

          lastUpdated: Date.now(),
        },
      ];
    }

    case USER_SIGN_OUT: {
      removeAllCookies();
      removeLocalStore('user');

      window.location.href = '/';
      return initialElementsState;
    }

    case ELEMENT_GET_START: {
      const { username, id } = action.payload;
      let index = -1;

      index = state.findIndex(e => e.username === username || e.id === id);

      return [
        ...state.slice(0, index),
        elementReducer(index === -1 ? undefined : state[index], action),
        ...state.slice(index + 1, state.length),
      ];
    }
    case ELEMENT_GET_ERROR: {
      const { username, id } = action.payload;
      let index = -1;

      index = state.findIndex(e => e.username === username || e.id === id);

      return [
        ...state.slice(0, index),
        elementReducer(state[index], action),
        ...state.slice(index + 1, state.length),
      ];
    }
    case ELEMENT_GET_SUCCESS: {
      const { username, id } = action.payload;
      let index = -1;

      index = state.findIndex(e => e.username === username || e.id === id);

      return [
        ...state.slice(0, index),
        elementReducer(state[index], action),
        ...state.slice(index + 1, state.length),
      ];
    }

    default:
      return state;
  }
};

export default elementsReducer;
