/**
 * Created by himank on 6/8/16.
 */
"use strict";
import { USER_SIGN_IN, USER_SIGN_IN_START, USER_SIGN_IN_ERROR, USER_SIGN_IN_SUCCESS,
  USER_SIGN_OUT, USER_SIGN_OUT_START, USER_SIGN_OUT_SUCCESS, USER_SIGN_OUT_ERROR,
  USER_UPDATE, USER_UPDATE_START, USER_UPDATE_SUCCESS, USER_UPDATE_ERROR,
  USER_FETCH, USER_FETCH_START, USER_FETCH_SUCCESS, USER_FETCH_ERROR } from '../actions/user';

import { readLocalStore, writeLocalStore, removeLocalStore } from "../actions/user";

let initialState = {
  isSignedIn  : false,
  isFetching  : false,
  isFetched   : false,
  isError     : false,
  error       : '',
  message     : '',
  lastUpdated : Date.now()
};

if(readLocalStore("user") !== null) {
  initialState = {
    ...initialState,
    ...readLocalStore("user"),
    isSignedIn : true,
    lastUpdated: Date.now()
  };
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGN_IN_START  : {
      return {
        ...state,
        isSignedIn : false,
        isFetching : true,
        isFetched  : false,
        isError    : false,
        error      : '',
        message    : '',
        lastUpdated: Date.now()
      };
    }
    case USER_SIGN_IN_ERROR  : {
      return {
        ...state,
        isSignedIn  : false,
        isFetching  : false,
        isFetched   : false,
        isError     : true,
        error       : action.payload.error,
        message     : action.payload.message,
        lastUpdated : Date.now()
      };
    }
    case USER_SIGN_IN_SUCCESS: {
      writeLocalStore("user", action.payload);
      return {
        ...state,
        ...action.payload,
        isSignedIn : true,
        isFetching : false,
        isFetched  : true,
        isError    : false,
        error      : '',
        message    : '',
        lastUpdated: Date.now()
      };
    }

    case USER_SIGN_OUT: {

      // removeCookieStore();
      removeLocalStore("user");
      window.location.href = '/';
      return state;
    }

    case USER_FETCH_START : {
      return {
        ...state,
        isError    : false,
        isFetched  : false,
        isFetching : true,
        error      : '',
        message    : '',
        lastUpdated: Date.now()
      };
    }
    case USER_FETCH_ERROR : {
      return {
        ...state,
        isError    : true,
        isFetched  : false,
        isFetching : false,
        error      : action.error,
        message    : action.message,
        lastUpdated: Date.now()
      };
    }
    case USER_FETCH_SUCCESS : {
      return {
        ...state,
        ...action.payload,
        isError    : false,
        isFetched  : true,
        isFetching : false,
        error      : '',
        message    : '',
        lastUpdated: Date.now()
      };
    }

    default:
      return state;
  }
};

export default userReducer;