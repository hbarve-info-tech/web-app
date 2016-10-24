'use strict';

var Hapi = require('hapi');

var server = new Hapi.Server();

server.connection({
  host : process.env.IP   || '0.0.0.0',
  port : process.env.PORT || 5000
});

server.route([
  {
    path: '/',
    method: 'GET',
    handler: (request, reply) => {
      reply("Hi there, you are great");
    }
  }
]);

server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Hapi server started @ ' + server.info.uri);
});

module.exports = server;
