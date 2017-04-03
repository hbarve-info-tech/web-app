
import { Server } from 'hapi';
import Hoek from 'hoek';
import Handlebars from 'handlebars';
import path from 'path';

import { server as serverConfig } from './config';
import plugins from './plugins';

const server = new Server();
server.connection(serverConfig);

server.register(plugins, (error1) => {
  if (error1) {
    throw error1;
  }
  console.log('All plugins are added.');

  server.views({
    engines: { hbs: Handlebars },
    relativeTo: `${__dirname}/../../node_modules/@hbarve1/mayash-views`,
    path: 'templates',
  });

  // Finally server is starting here.
  server.start((error2) => {
    Hoek.assert(!error2, error2);

    console.log(`Hapi server started @ ${server.info.uri}`);
  });
});

export default server;
