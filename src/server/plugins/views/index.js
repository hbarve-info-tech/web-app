
import Routes from './Routes';

const register = (server, options, next) => {
  server.route(Routes);

  next();
};

register.attributes = {
  pkg: {
    name: 'View',
    version: '2.0.0',
    description: 'This plugin contains all the features related to React server side rendering.',
  },
};

export default register;
