
import fetch from 'isomorphic-fetch';

const { NODE_ENV } = process.env;
const HOST = NODE_ENV === 'production' ? 'https://mayash.xyz' : 'http://localhost:5001';

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

export default {
  getElement,
};
