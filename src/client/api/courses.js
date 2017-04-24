
import fetch from 'isomorphic-fetch';

const { NODE_ENV } = process.env;
const HOST = NODE_ENV === 'production' ? 'https://mayash.xyz' : 'http://localhost:5001';


export const createModule = ({ id, token, courseId, moduleName }, callback) => {
  const url = `${HOST}/api/elements/${id}/courses/${courseId}/modules`;

  fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({ moduleName }),
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


export default {
  getCourse,
  getModule,

  getCourses,
  getModules,

  updateCourse,
  updateModule,
};
