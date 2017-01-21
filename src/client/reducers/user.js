
import { USER_SIGN_IN_START, USER_SIGN_IN_ERROR, USER_SIGN_IN_SUCCESS,
  USER_FETCH_START, USER_FETCH_SUCCESS, USER_FETCH_ERROR } from '../actions/user';

import { writeLocalStore, writeCookie } from '../api/clientApi';

const initialState = {
  isSigningIn: false,
  isSignedIn: false,

  isFetching: false,
  isFetched: false,

  isError: false,
  error: '',
  message: '',

  lastUpdated: Date.now(),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGN_IN_START: {
      return {
        ...state,
        isSigningIn: true,
        isSignedIn: false,

        isFetching: false,
        isFetched: false,

        isError: false,
        error: '',
        message: '',

        lastUpdated: Date.now(),
      };
    }
    case USER_SIGN_IN_ERROR: {
      return {
        ...state,
        isSigningIn: false,
        isSignedIn: false,

        isFetching: false,
        isFetched: false,

        isError: true,
        error: action.payload.error,
        message: action.payload.message,

        lastUpdated: Date.now(),
      };
    }
    case USER_SIGN_IN_SUCCESS: {
      const { payload } = action;

      writeLocalStore('user', payload);
      writeCookie('isSignedIn', true);
      writeCookie('id', payload.id);
      writeCookie('token', payload.token);

      return {
        ...state,
        ...payload,
        ...state,
        isSigningIn: false,
        isSignedIn: true,

        isFetching: false,
        isFetched: false,

        isError: false,
        error: '',
        message: '',

        lastUpdated: Date.now(),
      };
    }

    case USER_FETCH_START: {
      return {
        ...state,
        isError: false,
        isFetched: false,
        isFetching: true,
        error: '',
        message: '',
        lastUpdated: Date.now(),
      };
    }
    case USER_FETCH_ERROR: {
      return {
        ...state,
        isError: true,
        isFetched: false,
        isFetching: false,
        error: action.error,
        message: action.message,
        lastUpdated: Date.now(),
      };
    }
    case USER_FETCH_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        isError: false,
        isFetched: true,
        isFetching: false,
        error: '',
        message: '',
        lastUpdated: Date.now(),
      };
    }

    default:
      return state;
  }
};
