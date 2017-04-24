
import fetch from 'isomorphic-fetch';

const { NODE_ENV } = process.env;
const HOST = NODE_ENV === 'production' ? 'https://mayash.xyz' : 'http://localhost:5001';


export const getPost = ({ postId, token }, callback) => {
  const url = `${HOST}/api/posts/${postId}`;
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

export const getPosts = ({ id, token }, callback) => {
  const url = `${HOST}/api/elements/${id}/posts`;

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

export const updatePost = ({ id, token, postId, title, description, data }, callback) => {
  const url = `${HOST}/api/elements/${id}/articles/${postId}`;
  const payload = {};

  if (typeof title === 'string') {
    payload.title = title;
  }
  if (typeof description === 'string') {
    payload.description = description;
  }
  if (typeof data === 'string') {
    payload.data = data;
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

export const deletePost = ({ id, token, postId }, callback) => {
  const url = `${HOST}/api/elements/${id}/posts/${postId}`;

  fetch(url, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })
    .then(response => response.json())
    .then(json => callback(json));
};

export default {
  getPost,
  getPosts,
  updatePost,
  deletePost,
};
