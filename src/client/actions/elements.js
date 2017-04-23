
import api from '../api/elements';

export const USER_SIGN_IN_START = 'USER_SIGN_IN_START';
export const USER_SIGN_IN_SUCCESS = 'USER_SIGN_IN_SUCCESS';
export const USER_SIGN_IN_ERROR = 'USER_SIGN_IN_ERROR';

export const USER_SIGN_OUT = 'USER_SIGN_OUT';

export const USER_GET_START = 'USER_GET_START';
export const USER_GET_SUCCESS = 'USER_GET_SUCCESS';
export const USER_GET_ERROR = 'USER_GET_ERROR';

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

const signInStart = () => ({ type: USER_SIGN_IN_START });
const signInSuccess = payload => ({ type: USER_SIGN_IN_SUCCESS, payload });
const signInError = payload => ({ type: USER_SIGN_IN_ERROR, payload });
export const signIn = payload => (dispatch) => {
  dispatch(signInStart());

  api.signIn(payload, (success) => {
    if (success.statusCode === 200) {
      dispatch(signInSuccess(success.payload));
    }
    else if (success.statusCode >= 400) {
      dispatch(signInError(success));
    }
  });
};

const getUserStart = () => ({ type: USER_GET_START });
const getUserSuccess = payload => ({ type: USER_GET_SUCCESS, payload });
const getUserError = payload => ({ type: USER_GET_ERROR, payload });
export const getUser = ({ id, token }) => (dispatch) => {
  dispatch(getUserStart());
  dispatch(getElementStart({ id: parseInt(id, 10) }));

  api.getUser({ id, token }, (json) => {
    if (json.statusCode === 200) {
      dispatch(getUserSuccess(json.payload));
      dispatch(getElementSuccess(json.payload));
    }
    else if (json.statusCode >= 400) {
      dispatch(getUserError(json));
      dispatch(getElementError(json));
    }
  });
};

export const signOut = () => ({ type: USER_SIGN_OUT });
