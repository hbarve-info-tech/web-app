
import { Server } from 'hapi';
import Hoek from 'hoek';
import Handlebars from 'handlebars';

import { server as serverConfig } from './config';
import plugins from './plugins';

const server = new Server();
server.connection(serverConfig);

server.register(plugins, {
  routes: {
    prefix: `/api/${require('@hbarve1/mayash-api/package.json').version}`,
  },
}, (error1) => {
  if (error1) {
    throw error1;
  }
  console.log('All plugins are added.');

  server.views({
    engines: { html: Handlebars },
    relativeTo: `${__dirname}/../../`,
    path: 'public',
  });

  // Finally server is starting here.
  server.start((error2) => {
    Hoek.assert(!error2, error2);

    console.log(`Hapi server started @ ${server.info.uri}`);
  });
});

export default server;
