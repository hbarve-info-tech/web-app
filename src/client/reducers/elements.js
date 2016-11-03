"use strict";
import _ from "lodash";
import { ELEMENT_FETCH_START, ELEMENT_FETCH_SUCCESS, ELEMENT_FETCH_ERROR, ELEMENT_ADD, ELEMENT_UPDATE } from '../actions/elements';
let initialElementState = {
  isFetching  : false,
  isFetched   : false,
  isError     : false,
  error       : '',
  message     : '',
  lastUpdated : Date.now()
};
let initialState = {
  array       : [],
  isFetching  : false,
  isFetched   : false,
  isError     : false,
  error       : '',
  message     : '',
  lastUpdated : Date.now()
};


const elementReducer  = (state = initialElementState, action) => {
  switch (action.type) {
    case ELEMENT_ADD  : {
      return Object.assign(
        {},
        state,
        action.payload
      );
    }
    case ELEMENT_UPDATE : {
      return Object.assign(
        {},
        state,
        action.payload
      );
    }

    default:
      return state;
  }
};

const elementsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ELEMENT_FETCH_START   : {

      return Object.assign(
        {},
        state,
        {
          isError    : false,
          isFetched  : false,
          isFetching : true,
          error      : '',
          message    : '',
          lastUpdated: Date.now()
        }
      );
    }
    case ELEMENT_FETCH_ERROR   : {

      return Object.assign(
        {},
        state,
        {
          isError    : true,
          isFetched  : false,
          isFetching : false,
          error      : action.error,
          message    : action.message,
          lastUpdated: Date.now()
        }
      );
    }
    case ELEMENT_FETCH_SUCCESS : {
      let { array } = state;

      array = _.unionBy(state.array, [elementReducer(undefined, {
        type   : ELEMENT_ADD,
        payload: action.payload
      })]);
      array = _.uniqBy(array, 'id');

      return Object.assign(
        {},
        state,
        {
          array      : array,
          isError    : false,
          isFetched  : true,
          isFetching : false,
          error      : '',
          message    : '',
          lastUpdated: Date.now()
        }
      );
    }

    default:
      return state;
  }
};

export default elementsReducer;
