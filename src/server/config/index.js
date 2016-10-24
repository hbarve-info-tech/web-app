'use strict';

const server = {
  host : process.env.IP   || '0.0.0.0',
  port : process.env.PORT || 5000
};
const gcloud = {
  projectId: 'mayash-147416'
};


export {
  server,
  gcloud
};
export default {
  server,
  gcloud
};
