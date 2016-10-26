'use strict';

const server = {
  host : process.env.IP   || '0.0.0.0',
  port : process.env.PORT || 5000
};

const gcloud = {
  projectId: 'mayash-webapp'
};

const token = {
  key : '1267341C6F7D8BF45#50G[fdwo]4]y62'
};


export {
  server,
  gcloud,
  token
};
export default {
  server,
  gcloud,
  token
};
