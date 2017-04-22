
import * as api from '../api';

export const ELEMENT_GET_START = 'ELEMENT_GET_START';
export const ELEMENT_GET_SUCCESS = 'ELEMENT_GET_SUCCESS';
export const ELEMENT_GET_ERROR = 'ELEMENT_GET_ERROR';


export const getElementStart = payload => ({ type: ELEMENT_GET_START, payload });
export const getElementSuccess = payload => ({ type: ELEMENT_GET_SUCCESS, payload });
export const getElementError = payload => ({ type: ELEMENT_GET_ERROR, payload });
export const getElement = ({ id, username, token }) => (dispatch) => {
  dispatch(getElementStart({ id, username }));

  api.getElement({ id, username, token }, (json) => {
    if (json.statusCode === 200) {
      dispatch(getElementSuccess(json.payload));
    }
    else if (json.statusCode >= 400) {
      dispatch(getElementError(json));
    }
  });
};
