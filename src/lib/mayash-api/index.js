
import elements from '../mayash-api-elements';
import posts from '../mayash-api-posts';
import courses from '../mayash-api-courses';
import classroom from '../mayash-api-classrooms';

import photos from '../mayash-api-photos';
import videos from '../mayash-api-videos';
import files from '../mayash-api-files';

const register = (server, options, next) => {

  server.route([
    ...elements,
    ...posts,
    ...courses,
    ...classroom,

    ...photos,
    ...videos,
    ...files,
  ]);

  next();
};

register.attributes = {
  pkg: {
    name: 'mayash-api',
    version: '0.0.0',
    description: 'This plugin contains all the features related to Course.',
  },
};

export default register;
