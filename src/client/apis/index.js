'use strict';
import fetch from 'isomorphic-fetch';

/**
 * This function will read local store for with 'user' key and return user info.
 * @returns {object}
 */
export const readLocalStore = () => {

  // Code for localStorage/sessionStorage.
  if (typeof(Storage) !== "undefined") {
    return JSON.parse(window.localStorage.getItem("user"));
  }
  // Sorry! No Web Storage support..
  else {
    return null;
  }

};

/**
 * This function will read and return cookie.
 */
const readCookieStore = () => {

};

/**
 * This function will write data in local storage.
 * @param {object} data - Data to store in local store.
 */
const writeLocalStore = (data) => {
  if (typeof(Storage) !== "undefined") {
    window.localStorage.setItem("user", JSON.stringify(data));
  } else {
    // Sorry! No Web Storage support..
  }
};

/**
 *
 * @param {object} data       - Contains data to store in cookie.
 * @param {number} data.id    - User's Id
 * @param {string} data.token - JsonWebToken
 */
const writeCookieStore = (data) => {
  document.cookie = "user=" + JSON.stringify({
      id   : data.id,
      token: data.token
    }) + ";";
};

const removeLocalStorage = () => {
  if (typeof(Storage) !== "undefined") {
    window.localStorage.removeItem("user");
  }
  else {
    // Sorry! No Web Storage support..
  }
};
const removeCookieStore  = () => {
  document.cookie = "user=null;";
};

export const getToken  = () => {
  let localUser = readLocalStore();
  if(localUser !== null) {
    return localUser.token;
  }
  else {
    return null;
  }
};

export const getUserId = () => {
  let localUser = readLocalStore();

  if(localUser !== null) {
    return localUser.id;
  }
  else {
    return null;
  }

};

export const signIn        = (payload, callback) => {
  let url = '/api/signin';

  fetch(url, {
    method: 'POST',
    headers: {
      'Accept'       : 'application/json',
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .then(response => response.json())
    .then(json => callback(json));
};

export const getUser       = (callback) => {
  let url = '/api/users/' + getUserId();

  fetch(url, {
    method: 'GET',
    headers: {
      'Accept'       : 'application/json',
      'Content-Type' : 'application/json',
      'Authorization': getToken()
    }
  })
    .then(response => response.json())
    .then(json => callback(json));
};

export const getElement    = ({id, username}, callback) => {
  let url = `/api/elements`;

  if(username) {
    url += `?username=${username}`;
  }
  else {
    url += `?id=${id}`;
  }

  fetch(url, {
    method: 'GET',
    headers: {
      'Accept'       : 'application/json',
      'Content-Type' : 'application/json',
      'Authorization': getToken()
    }
  })
    .then(response => response.json())
    .then(json     => callback(json));
};

export const getCourses    = (id, callback) => {
  fetch('/api/elements/' + id + '/courses', {
    method: 'GET',
    headers: {
      'Accept'       : 'application/json',
      'Content-Type' : 'application/json',
      'Authorization': getToken()
    }
  })
    .then(response => response.json())
    .then(json => callback(json));
};

export const createCourse  = (payload, callback) => {
  let url = '/api/elements/'+ getUserId() +'/courses';

  fetch(url, {
    method: 'POST',
    headers: {
      'Accept'       : 'application/json',
      'Content-Type' : 'application/json',
      'Authorization': getToken()
    },
    body: JSON.stringify(payload)
  })
    .then(response => response.json())
    .then(json => callback(json));
};

export const getCourse     = (courseId, callback) => {
  let url = '/api/courses/' + courseId;

  fetch(url, {
    method: 'GET',
    headers: {
      'Accept'       : 'application/json',
      'Content-Type' : 'application/json',
      'Authorization': getToken()
    }
  })
    .then(response => response.json())
    .then(json => callback(json));
};

export const updateCourse  = (courseId, payload, callback) => {
  let url = '/api/elements/'+ getUserId() +'/courses/' + courseId;

  fetch(url, {
    method: 'PUT',
    headers: {
      'Accept'       : 'application/json',
      'Content-Type' : 'application/json',
      'Authorization': getToken()
    },
    body: JSON.stringify(payload)
  })
    .then(response => response.json())
    .then(json => callback(json));
};

export const deleteCourse  = (courseId, callback) => {
  let url = '/api/elements/'+ getUserId() +'/courses/' + courseId;

  fetch(url, {
    method: 'POST',
    headers: {
      'Accept'       : 'application/json',
      'Content-Type' : 'application/json',
      'Authorization': getToken()
    }
  })
    .then(response => response.json())
    .then(json => callback(json));
};

export const getModules    = (courseId, callback) => {
  let url = '/api/courses/' + courseId + '/modules';

  fetch(url, {
    method: 'GET',
    headers: {
      'Accept'       : 'application/json',
      'Content-Type' : 'application/json',
      'Authorization': getToken()
    }
  })
    .then(response => response.json())
    .then(json => callback(json));
};

export const createModule  = (courseId, payload, callback) => {
  let url = '/api/elements/'+ getUserId() +'/courses/'+ courseId +'/modules';

  fetch(url, {
    method: 'POST',
    headers: {
      'Accept'       : 'application/json',
      'Content-Type' : 'application/json',
      'Authorization': getToken()
    },
    body: JSON.stringify(payload)
  })
    .then(response => response.json())
    .then(json => callback(json));
};

export const getModule     = (courseId, moduleId, callback) => {
  fetch('/api/courses/' + courseId + '/modules/' + moduleId, {
    method: 'GET',
    headers: {
      'Accept'       : 'application/json',
      'Content-Type' : 'application/json',
      'Authorization': getToken()
    }
  })
    .then(response => response.json())
    .then(json => callback(json));
};

export const updateModule  = (courseId, moduleId, payload, callback) => {
  let url = '/api/elements/'+ getUserId() +'/courses/' + courseId + '/modules/' + moduleId;

  fetch(url, {
    method: 'PUT',
    headers: {
      'Accept'       : 'application/json',
      'Content-Type' : 'application/json',
      'Authorization': getToken()
    },
    body: JSON.stringify(payload)
  })
    .then(response => response.json())
    .then(json => callback(json));
};

export const deleteModule  = (courseId, moduleId, callback) => {
  let url = '/api/elements/'+ getUserId() +'/courses/' + courseId + '/modules/' + moduleId;

  fetch(url, {
    method: 'DELETE',
    headers: {
      'Accept'       : 'application/json',
      'Content-Type' : 'application/json',
      'Authorization': getToken()
    }
  })
    .then(response => response.json())
    .then(json => callback(json));
};


export const getArticles    = (id, callback) => {
  let url = '/api/elements/' + id + '/articles';

  fetch(url, {
    method: 'GET',
    headers: {
      'Accept'       : 'application/json',
      'Content-Type' : 'application/json',
      'Authorization': getToken()
    }
  })
    .then(response => response.json())
    .then(json     => callback(json));
};

export const createArticle  = (payload, callback) => {
  let url = '/api/elements/'+ getUserId() +'/articles';

  fetch(url, {
    method: 'POST',
    headers: {
      'Accept'       : 'application/json',
      'Content-Type' : 'application/json',
      'Authorization': getToken()
    },
    body: JSON.stringify(payload)
  })
    .then(response => response.json())
    .then(json     => callback(json));
};

export const getArticle     = (articleId, callback) => {
  let url = '/api/articles/' + articleId;

  fetch(url, {
    method: 'GET',
    headers: {
      'Accept'       : 'application/json',
      'Content-Type' : 'application/json',
      'Authorization': getToken()
    }
  })
    .then(response => response.json())
    .then(json     => callback(json));
};

export const updateArticle  = (articleId, payload, callback) => {
  let url = '/api/elements/'+ getUserId() +'/articles/' + articleId;

  fetch(url, {
    method: 'PUT',
    headers: {
      'Accept'       : 'application/json',
      'Content-Type' : 'application/json',
      'Authorization': getToken()
    },
    body: JSON.stringify(payload)
  })
    .then(response => response.json())
    .then(json     => callback(json));
};

export const deleteArticle  = (articleId, callback) => {
  let url = '/api/elements/'+ getUserId() +'/articles/' + articleId;

  fetch(url, {
    method: 'DELETE',
    headers: {
      'Accept'       : 'application/json',
      'Content-Type' : 'application/json',
      'Authorization': getToken()
    }
  })
    .then(response => response.json())
    .then(json     => callback(json));
};

export const getClassroomCourses = ({id, degree, semester, next}, callback) => {
  let url = `/api/classroom/${id}/courses`;//?${semester ? `semester=${semester}` : ``}&${degree ? `degree=${degree}`: ``}`;

  if(degree) {

  }
  if(semester) {

  }
  if(next) {

  }

  fetch(url, {
    method: 'GET',
    headers: {
      'Accept'       : 'application/json',
      'Content-Type' : 'application/json',
      'Authorization': getToken()
    }
  })
    .then(response => response.json())
    .then(json     => callback(json));
};
