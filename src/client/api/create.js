
import fetch from 'isomorphic-fetch';

const { NODE_ENV } = process.env;
const HOST = NODE_ENV === 'production' ? 'https://mayash.xyz' : 'http://localhost:5001';


export const createPost = ({ id, token, postType, title, description, data }, callback) => {
  const url = `${HOST}/api/elements/${id}/posts`;

  const body = {
    postType,
    title,
  };

  if (typeof description === 'string') {
    body.description = description;
  }

  if (typeof data === 'object') {
    body.data = data;
  }

  fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(body),
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
