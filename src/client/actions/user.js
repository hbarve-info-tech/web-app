"use strict";
//Global variables are defined here.
const { NODE_ENV } = process.env;
const HOST = NODE_ENV === `production` ? `https://mayash.xyz` : `http://localhost:5001`;

//These constants are for user Signing In.
export const USER_SIGN_IN         = 'USER_SIGN_IN';
export const USER_SIGN_IN_START   = 'USER_SIGN_IN_START';
export const USER_SIGN_IN_SUCCESS = 'USER_SIGN_IN_SUCCESS';
export const USER_SIGN_IN_ERROR   = 'USER_SIGN_IN_ERROR';

//These constants are for user Signing In.
export const USER_SIGN_OUT         = 'USER_SIGN_OUT';
export const USER_SIGN_OUT_START   = 'USER_SIGN_OUT_START';
export const USER_SIGN_OUT_SUCCESS = 'USER_SIGN_OUT_SUCCESS';
export const USER_SIGN_OUT_ERROR   = 'USER_SIGN_OUT_ERROR';

//These constants are for fetching user's data from server.
export const USER_FETCH         = 'USER_FETCH';
export const USER_FETCH_START   = 'USER_FETCH_START';
export const USER_FETCH_SUCCESS = 'USER_FETCH_SUCCESS';
export const USER_FETCH_ERROR   = 'USER_FETCH_ERROR';

//These constants are from updating user's data.
export const USER_UPDATE         = 'USER_UPDATE';
export const USER_UPDATE_START   = 'USER_UPDATE_START';
export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';
export const USER_UPDATE_ERROR   = 'USER_UPDATE_ERROR';

//Import library here.
import fetch from 'isomorphic-fetch';

export const readLocalStore    = (key)       => {

  // Code for localStorage/sessionStorage.
  if (typeof(Storage) !== "undefined") {
    return JSON.parse(window.localStorage.getItem(key));
  }
  // Sorry! No Web Storage support..
  else {
    return null;
  }

};
export const writeLocalStore   = (key, data) => {
  if (typeof(Storage) !== "undefined") {
    window.localStorage.setItem(key, JSON.stringify(data));
  } else {
    // Sorry! No Web Storage support..
  }
};
export const removeLocalStore  = (key)       => {
  if (typeof(Storage) !== "undefined") {
    window.localStorage.removeItem(key);
  }
  else {
    // Sorry! No Web Storage support..
  }
};

export const readCookieStore   = ()     => {

};
export const writeCookieStore  = (data) => {
  document.cookie = "user=" + JSON.stringify({
      id   : data.id,
      token: data.token
    }) + ";";
};
export const removeCookieStore = ()     => {
  document.cookie = "user=null;";
};

export const getToken = () => {
  let localUser = readLocalStore("user");
  if(localUser !== null) {
    return localUser.token;
  }
  else {
    return null;
  }
};

export const getUserId = () => {
  let localUser = readLocalStore("user");

  if(localUser !== null) {
    return localUser.id;
  }
  else {
    return null;
  }

};


/**
 * This function will create new user.
 * @param newUser
 * @returns {function(*)}
 */
export const signUp = (newUser) => {

  fetch('/api/signup', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUser)
  }).then(response => response.json())
    .then((json) => {

      if(json.status === 200) {
        return 'success'
      }

    });

};


const signInStart   = ()        => {
  return {
    type: USER_SIGN_IN_START
  }
};
const signInSuccess = (payload) => {
  return {
    type: USER_SIGN_IN_SUCCESS,
    payload
  };
};
const signInError   = (payload) => {
  return {
    type: USER_SIGN_IN_ERROR,
    payload
  };
};
export const signIn = (payload) => {

  return (dispatch) => {

    dispatch(signInStart());
    let url = `${HOST}/api/signin`;

    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(response => response.json())
      .then(
        (success) => {
          if(success.statusCode === 200) {
            dispatch(signInSuccess(success.payload));
          }
          else if(success.statusCode >= 400) {
            dispatch(signInError(success));
          }
        }
      );
  };
};



const signOutStart   = () => {
  return {
    type: USER_SIGN_OUT_START
  };
};
const signOutSuccess = () => {
  return {
    type: USER_SIGN_OUT_SUCCESS
  };
};
const signOutError   = () => {
  return {
    type: USER_SIGN_OUT_ERROR
  };
};
export const signOut = () => {
  return (dispatch) => {
    dispatch({
      type: USER_SIGN_OUT
    });
  };
};



const fetchUserStart   = ()        => {
  return {
    type: USER_FETCH_START
  };
};
const fetchUserSuccess = (payload) => {
  return {
    type: USER_FETCH_SUCCESS,
    payload
  };
};
const fetchUserError   = (payload) => {
  return {
    type: USER_FETCH_ERROR,
    payload
  };
};
export const fetchUser = (payload) => {
  return (dispatch) => {

    dispatch(fetchUserStart());

    fetch('/api/users/' + getUserId(), {
      method: 'GET',
      headers: {
        'Accept'       : 'application/json',
        'Content-Type' : 'application/json',
        'Authorization': getToken()
      }
    })
      .then(response => response.json())
      .then(
        (json) => {
          if(json.statusCode === 200) {
            dispatch(fetchUserSuccess(json.payload));
          }
          else if(json.statusCode >= 400) {
            dispatch(fetchUserError(json));
          }
        }
      );
  }
};



const updateUserStart   = ()        => {
  return {
    type: USER_UPDATE_START
  };
};
const updateUserSuccess = (payload) => {
  return {
    type: USER_UPDATE_SUCCESS,
    payload
  };
};
const updateUserError   = (payload) => {
  return {
    type: USER_UPDATE_ERROR,
    payload
  }
};
export const updateUser = (payload) => {
  return (dispatch) => {

    dispatch(updateUserStart());

    fetch('/api/users/' + getUserId(), {
      method: 'PUT',
      headers: {
        'Accept'       : 'application/json',
        'Content-Type' : 'application/json',
        'Authorization': getToken()
      },
      body: JSON.stringify(payload)
    })
      .then(response => response.json())
      .then(
        (success) => {

          if(success.status === 200 || success.head === true) {

            dispatch({
              type    : USER_UPDATE_SUCCESS,
              payload : success.payload || success.data
            });

          }
          else if(success.status >= 400 || success.head === false) {

            dispatch({
              type   : USER_UPDATE_ERROR,
              payload: success.payload || { errorMessage: success.msg }
            });

          }
        },
        (error) => {

        }
      );

  };
};
