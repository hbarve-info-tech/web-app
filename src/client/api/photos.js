
import fetch from 'isomorphic-fetch';

import { getUserId, getToken } from './clientApi';

const { NODE_ENV } = process.env;
const HOST = NODE_ENV === 'production' ? 'https://mayash.xyz' : 'http://localhost:5001';

export const photoUpload = ({ formData }, callback) => {
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

export default {
  photoUpload,
};
