'use strict';

export const server = {
  host : process.env.IP   || '0.0.0.0',
  port : process.env.PORT || 5000
};

export const gcloud = {
  projectId: 'mayash-webapp'
};

export const token = {
  key : '1267341C6F7D8BF45#50G[fdwo]4]y62'
};

export default {
  server,
  gcloud,
  token
};
