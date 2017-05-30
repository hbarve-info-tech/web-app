
// TODO: use any of these libraries to manipulate photos
// https://github.com/oliver-moran/jimp
// https://github.com/EyalAr/lwip
// http://camanjs.com/

import GetImage from './GetImage';
import UploadImage from './UploadImage';

export const Routes = [

  { method: 'GET', path: '/api/elements/{id}/photos/{imageName}', config: GetImage },
  { method: 'POST', path: '/api/elements/{id}/photos', config: UploadImage },
  { method: 'DELETE', path: '/api/elements/{id}/photos/{photoName}', config: { handler: (request, reply) => reply('Hi there')} },

  { method: 'GET', path: '/api/posts/{postId}/photos/{photoName}', config: { handler: (request, reply) => reply('Hi there')} },
  { method: 'POST', path: '/api/elements/{id}/posts/{postId}/photos', config: { handler: (request, reply) => reply('Hi there')} },
  { method: 'DELETE', path: '/api/elements/{id}/posts/{postId}/photos/{photoName}', config: { handler: (request, reply) => reply('Hi there')} },

  { method: 'GET', path: '/api/courses/{courseId}/photos/{photoName}', config: { handler: (request, reply) => reply('Hi there')} },
  { method: 'POST', path: '/api/elements/{id}/courses/{courseId}/photos', config: { handler: (request, reply) => reply('Hi there')} },
  { method: 'DELETE', path: '/api/elements/{id}/courses/{courseId}/photos/{photoName}', config: { handler: (request, reply) => reply('Hi there')} },

];

export default Routes;
