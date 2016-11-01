"use strict";
//Global variables are defined here.

//These constants are for fetching element's data from server.
export const ELEMENT_ADD           = 'ELEMENT_ADD';
export const ELEMENT_UPDATE        = 'ELEMENT_UPDATE';

export const ELEMENT_FETCH         = 'ELEMENT_FETCH';
export const ELEMENT_FETCH_START   = 'ELEMENT_FETCH_START';
export const ELEMENT_FETCH_SUCCESS = 'ELEMENT_FETCH_SUCCESS';
export const ELEMENT_FETCH_ERROR   = 'ELEMENT_FETCH_ERROR';

import * as api from "../apis";

export const fetchElementStart   = ()        => {
  return {
    type: ELEMENT_FETCH_START
  };
};
export const fetchElementSuccess = (payload) => {
  return {
    type: ELEMENT_FETCH_SUCCESS,
    payload
  };
};
export const fetchElementError   = (payload) => {
  return {
    type: ELEMENT_FETCH_ERROR,
    payload
  };
};
export const fetchElement        = (payload) => {
  return (dispatch) => {

    dispatch(fetchElementStart());

    api.getElement(payload.id, payload.q, (json) => {
      if(json.statusCode === 200) {
        dispatch(fetchElementSuccess(json.payload));
      }
      else if(json.statusCode >= 400) {
        dispatch(fetchElementError(json));
      }
    });

  }
};
