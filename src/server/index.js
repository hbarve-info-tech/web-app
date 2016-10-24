'use strict';
import { Server } from "hapi";
import config     from "./config";
import plugins    from "./plugins";

const server = new Server();
server.connection(config.server);

server.register(plugins, (error) => {
  if(error) {
    throw error;
  }
  console.log('All plugins are added.');

  //Finally server is starting here.
  server.start((error) => {
    if (error) {
      throw error;
    }
    console.log('Hapi server started @ ' + server.info.uri);
  });
});

export default server;
