
import Routes from './Routes';

const register = (server, options, next) => {
  server.route(Routes);

  next();
};

register.attributes = {
  pkg: {
    name: 'Elements',
    version: '1.0.0',
    description: 'This plugin contains all the features related to element.',
  },
};

export default register;
