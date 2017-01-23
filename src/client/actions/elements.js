
import * as api from '../api';

// Global variables are defined here.
// These constants are for fetching element's data from server.
export const ELEMENT_FETCH = 'ELEMENT_FETCH';
export const ELEMENT_FETCH_START = 'ELEMENT_FETCH_START';
export const ELEMENT_FETCH_SUCCESS = 'ELEMENT_FETCH_SUCCESS';
export const ELEMENT_FETCH_ERROR = 'ELEMENT_FETCH_ERROR';


export const fetchElementStart = payload => ({ type: ELEMENT_FETCH_START, payload });
export const fetchElementSuccess = payload => ({ type: ELEMENT_FETCH_SUCCESS, payload });
export const fetchElementError = payload => ({ type: ELEMENT_FETCH_ERROR, payload });
export const fetchElement = ({ id, username, token }) => (dispatch) => {
  dispatch(fetchElementStart({ id, username }));

  api.getElement({ id, username, token }, (json) => {
    if (json.statusCode === 200) {
      dispatch(fetchElementSuccess(json.payload));
    }
    else if (json.statusCode >= 400) {
      dispatch(fetchElementError(json));
    }
  });
};
