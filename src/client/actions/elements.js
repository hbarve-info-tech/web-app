
import api from '../api/elements';
import {
  ELEMENT_GET_START, ELEMENT_GET_ERROR, ELEMENT_GET_SUCCESS,
  USER_SIGN_IN_START, USER_SIGN_IN_ERROR, USER_SIGN_IN_SUCCESS,
  USER_SIGN_OUT,
} from '../constants/elements';

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

export const signOut = () => ({ type: USER_SIGN_OUT });

const getElementStart = payload => ({ type: ELEMENT_GET_START, payload });
const getElementSuccess = payload => ({ type: ELEMENT_GET_SUCCESS, payload });
const getElementError = payload => ({ type: ELEMENT_GET_ERROR, payload });
export const getElement = ({ id, username, token }) => (dispatch) => {
  dispatch(getElementStart({ id, username }));

  api.getElement({ id, username, token }, (json) => {
    if (json.statusCode === 200) {
      dispatch(getElementSuccess(json.payload));
    }
    else if (json.statusCode >= 400) {
      dispatch(getElementError({ id, username, ...json }));
    }
  });
};


export default {
  signIn,
  signOut,

  getElement,
};
