
import * as api from '../api';

// Global variables are defined here.
// These constants are for user Signing In.
export const USER_SIGN_IN = 'USER_SIGN_IN';
export const USER_SIGN_IN_START = 'USER_SIGN_IN_START';
export const USER_SIGN_IN_SUCCESS = 'USER_SIGN_IN_SUCCESS';
export const USER_SIGN_IN_ERROR = 'USER_SIGN_IN_ERROR';


const signInStart = () => ({
  type: USER_SIGN_IN_START,
});
const signInSuccess = payload => ({
  type: USER_SIGN_IN_SUCCESS,
  payload,
});
const signInError = payload => ({
  type: USER_SIGN_IN_ERROR,
  payload,
});
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
