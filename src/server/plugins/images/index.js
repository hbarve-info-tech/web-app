
// TODO: use any of these libraries to manipulate photos
// https://github.com/oliver-moran/jimp
// https://github.com/EyalAr/lwip
// http://camanjs.com/

import GetImage from './GetImage';
import UploadImage from './UploadImage';

const register = (server, options, next) => {
  server.route([

    { method: 'GET', path: '/api/elements/{id}/images/{imageName}', config: GetImage },
    { method: 'POST', path: '/api/elements/{id}/images', config: UploadImage },

  ]);

  next();
};

register.attributes = {
  pkg: {
    name: 'Images',
    version: '1.0.0',
    description: 'This plugin contains all the features related to Images.',
  },
};

export default register;
