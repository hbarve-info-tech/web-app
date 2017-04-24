
import fetch from 'isomorphic-fetch';

const { NODE_ENV } = process.env;
const HOST = NODE_ENV === 'production' ? 'https://mayash.xyz' : 'http://localhost:5001';


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

export default {
  getClassroomCourses,
};
