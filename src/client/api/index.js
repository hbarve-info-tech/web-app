'use strict';
const { NODE_ENV } = process.env;
const HOST = NODE_ENV === `production` ? `https://mayash.xyz` : `http://localhost:5001`;

import fetch from 'isomorphic-fetch';

export const signIn = (payload, callback) => {
  let url = `${HOST}/api/signin`;

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
