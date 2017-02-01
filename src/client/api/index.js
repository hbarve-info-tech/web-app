
import fetch from 'isomorphic-fetch';

import { getUserId, getToken } from './clientApi';

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

export const createArticle = ({ id, token, articleName }, callback) => {
  const url = `${HOST}/api/elements/${id}/articles`;

  fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({ articleName }),
  })
    .then(response => response.json())
    .then(json => callback(json));
};

export const updateArticle = ({
  id, token,
  articleId, articleName,
  description, articleData,
}, callback) => {
  const url = `${HOST}/api/elements/${id}/articles/${articleId}`;
  const payload = {};

  if (articleName) {
    payload.articleName = articleName;
  }
  if (description) {
    payload.description = description;
  }
  if (articleData) {
    payload.articleData = articleData;
  }

  fetch(url, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(payload),
  })
    .then(response => response.json())
    .then(json => callback(json));
};


export const createCourse = ({ id, token, courseName }, callback) => {
  const url = `${HOST}/api/elements/${id}/courses`;

  fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({ courseName }),
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

export const updateCourse = ({
  id,
  token,
  courseId,
  courseName,
  description,
  level,
  standard,
}, callback) => {
  const url = `${HOST}/api/elements/${id}/courses/${courseId}`;
  const payload = {};

  if (courseName) {
    payload.courseName = courseName;
  }
  if (description) {
    payload.description = description;
  }
  if (level) {
    payload.level = level;
  }
  if (standard) {
    payload.standard = standard;
  }

  fetch(url, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(payload),
  })
    .then(response => response.json())
    .then(json => callback(json));
};

export const updateModule = ({
  id,
  token,
  courseId,
  moduleId,
  moduleName,
  moduleData,
}, callback) => {
  const url = `${HOST}/api/elements/${id}/courses/${courseId}/modules/${moduleId}`;
  const payload = {};

  if (moduleName) {
    payload.moduleName = moduleName;
  }
  if (moduleData) {
    payload.moduleData = moduleData;
  }

  fetch(url, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(payload),
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


export const fileUpload = ({ formData }, callback) => {
  const url = `${HOST}/api/elements/${getUserId()}/images`;

  fetch(url, {
    method: 'POST',
    headers: {
      Authorization: getToken(),
    },
    body: formData,
  })
    .then(response => response.json())
    .then(json => callback(json));
};
