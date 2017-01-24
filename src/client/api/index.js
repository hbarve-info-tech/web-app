
import fetch from 'isomorphic-fetch';

const { NODE_ENV } = process.env;
const HOST = NODE_ENV === 'production' ? 'https://mayash.xyz' : 'http://localhost:5001';


export const signIn = (payload, callback) => {
  const url = `${HOST}/api/signin`;

  fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(response => response.json())
    .then(json => callback(json));
};

export const fetchUser = ({ id, token }, callback) => {
  const url = `${HOST}/api/users/${id}`;

  fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })
    .then(response => response.json())
    .then(json => callback(json));
};

export const getElement = ({ id, username, token }, callback) => {
  const url = `${HOST}/api/elements?${typeof id === 'undefined' ? `username=${username}` : `id=${id}`}`;

  fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })
    .then(response => response.json())
    .then(json => callback(json));
};

export const getArticle = ({ articleId, token }, callback) => {
  const url = `${HOST}/api/articles/${articleId}`;
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  if (token) {
    headers.Authorization = token;
  }

  fetch(url, {
    method: 'GET',
    headers,
  })
    .then(response => response.json())
    .then(json => callback(json));
};

export const getArticles = ({ id, token }, callback) => {
  const url = `${HOST}/api/elements/${id}/articles`;

  fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })
    .then(response => response.json())
    .then(json => callback(json));
};

export const getCourses = ({ id, token }, callback) => {
  const url = `${HOST}/api/elements/${id}/courses`;

  fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })
    .then(response => response.json())
    .then(json => callback(json));
};

export const getCourse = ({ courseId, token }, callback) => {
  const url = `${HOST}/api/courses/${courseId}`;

  fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })
    .then(response => response.json())
    .then(json => callback(json));
};

export const getModules = ({ courseId, token }, callback) => {
  const url = `${HOST}/api/courses/${courseId}/modules`;

  fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })
    .then(response => response.json())
    .then(json => callback(json));
};

export const getModule = ({ courseId, moduleId, token }, callback) => {
  const url = `${HOST}/api/courses/${courseId}/modules/${moduleId}`;

  fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })
    .then(response => response.json())
    .then(json => callback(json));
};

export const getClassroomCourses = ({ id, token }, callback) => {
  const url = `${HOST}/api/classroom/${id}/courses`;

  fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })
    .then(response => response.json())
    .then(json => callback(json));
};
