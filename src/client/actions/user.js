
import * as api from '../api';

// Global variables are defined here.
// These constants are for user Signing In.
export const USER_SIGN_IN = 'USER_SIGN_IN';
export const USER_SIGN_IN_START = 'USER_SIGN_IN_START';
export const USER_SIGN_IN_SUCCESS = 'USER_SIGN_IN_SUCCESS';
export const USER_SIGN_IN_ERROR = 'USER_SIGN_IN_ERROR';

// These constants are for user Signing In.
export const USER_SIGN_OUT = 'USER_SIGN_OUT';

// These constants are for fetching user's data from server.
export const USER_FETCH = 'USER_FETCH';
export const USER_FETCH_START = 'USER_FETCH_START';
export const USER_FETCH_SUCCESS = 'USER_FETCH_SUCCESS';
export const USER_FETCH_ERROR = 'USER_FETCH_ERROR';


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

const fetchUserStart = () => ({ type: USER_FETCH_START });
const fetchUserSuccess = payload => ({ type: USER_FETCH_SUCCESS, payload });
const fetchUserError = payload => ({ type: USER_FETCH_ERROR, payload });
export const fetchUser = ({ id, token }) => (dispatch) => {
  dispatch(fetchUserStart());

  api.fetchUser({ id, token }, (json) => {
    if (json.statusCode === 200) {
      dispatch(fetchUserSuccess(json.payload));
    }
    else if (json.statusCode >= 400) {
      dispatch(fetchUserError(json));
    }
  });
};

export const signOut = () => ({ type: USER_SIGN_OUT });
