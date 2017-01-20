
import { USER_SIGN_IN_START, USER_SIGN_IN_ERROR, USER_SIGN_IN_SUCCESS } from '../actions/user';

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
    case USER_SIGN_IN_START : {
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
    case USER_SIGN_IN_ERROR : {
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

    default:
      return state;
  }
};
