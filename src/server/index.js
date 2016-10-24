'use strict';
import { Server } from "hapi";
import config     from "./config";

const server = new Server();
server.connection(config.server);

server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Hapi server started @ ' + server.info.uri);
});

module.exports = server;
