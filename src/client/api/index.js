
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
