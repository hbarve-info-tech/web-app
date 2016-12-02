"use strict";
import _ from "lodash";
import { ELEMENT_FETCH_START, ELEMENT_FETCH_SUCCESS, ELEMENT_FETCH_ERROR, ELEMENT_ADD, ELEMENT_UPDATE } from '../actions/elements';

import { readLocalStore } from "../actions/user";

let initialElementState = {
  isFetching  : false,
  isFetched   : false,
  isError     : false,
  error       : '',
  message     : '',
  lastUpdated : Date.now()
};
let initialState        = {
  array       : [],
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
    array: [{
      ...initialElementState,
      ...readLocalStore("user"),
      elementType: "user",
      isFetched  : true,
      lastUpdated: Date.now()
    }]
  };
}

const elementReducer  = (state = initialElementState, action) => {
  switch (action.type) {
    case ELEMENT_FETCH_START: {
      return {
        ...state,
        ...action.payload,
        isFetching : true,
        lastUpdated: Date.now()
      };
    }
    case ELEMENT_FETCH_ERROR: {

      return {
        ...state,
        isFetched : false,
        isFetching: true,
        isError   : true,
        error     : action.error,
        message   : action.message
      };
    }
    case ELEMENT_FETCH_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        isFetching : false,
        isFetched  : true,
        lastUpdated: Date.now()
      };
    }

    default:
      return state;
  }
};

const elementsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ELEMENT_FETCH_START   : {
      let { username, id } = action.payload;
      let index = -1;

      if(username) {
        index = state.array.findIndex(element => element.username == username);
      }
      else if(id) {
        index = state.array.findIndex(element => element.id == id);
      }

      return {
        ...state,
        array : [
          ...state.array.slice(0, index),
          elementReducer(undefined, action),
          ...state.array.slice(index + 1, state.array.length)
        ]
      };
    }
    case ELEMENT_FETCH_ERROR   : {
      let { username, id } = action.payload;
      let index = -1;

      if(username) {
        index = state.array.findIndex(element => element.username == username);
      }
      else if(id) {
        index = state.array.findIndex(element => element.id == id);
      }

      return {
        ...state,
        array : [
          ...state.array.slice(0, index),
          elementReducer(state.array[index], action),
          ...state.array.slice(index + 1, state.array.length)
        ],
        isFetching : false,
        isFetched  : false,
        lastUpdated: Date.now()
      };
    }
    case ELEMENT_FETCH_SUCCESS : {
      let { array } = state;
      let { username, id } = action.payload;
      let index = -1;

      if(username) {
        index = state.array.findIndex(element => element.username == username);
      }
      else if(id) {
        index = state.array.findIndex(element => element.id == id);
      }


      return {
        ...state,
        array      : [
          ...array.slice(0, index),
          elementReducer(array[index], action),
          ...array.slice(index + 1, array.length)
        ],
        isFetching : false,
        isFetched  : false,
        lastUpdated: Date.now()
      };
    }

    default:
      return state;
  }
};

export default elementsReducer;
