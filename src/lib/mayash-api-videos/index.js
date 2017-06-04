
export const Routes = [

  { method: 'GET', path: '/api/elements/{id}/videos/{imageName}', config: { handler: (request, reply) => reply('Hi there')}  },
  { method: 'POST', path: '/api/elements/{id}/videos', config: { handler: (request, reply) => reply('Hi there')}  },
  { method: 'DELETE', path: '/api/elements/{id}/videos/{videoName}', config: { handler: (request, reply) => reply('Hi there')} },

  { method: 'GET', path: '/api/posts/{postId}/videos/{videoName}', config: { handler: (request, reply) => reply('Hi there')} },
  { method: 'POST', path: '/api/elements/{id}/posts/{postId}/videos', config: { handler: (request, reply) => reply('Hi there')} },
  { method: 'DELETE', path: '/api/elements/{id}/posts/{postId}/videos/{videoName}', config: { handler: (request, reply) => reply('Hi there')} },

  { method: 'GET', path: '/api/courses/{courseId}/videos/{videoName}', config: { handler: (request, reply) => reply('Hi there')} },
  { method: 'POST', path: '/api/elements/{id}/courses/{courseId}/videos', config: { handler: (request, reply) => reply('Hi there')} },
  { method: 'DELETE', path: '/api/elements/{id}/courses/{courseId}/videos/{videoName}', config: { handler: (request, reply) => reply('Hi there')} },

];

export default Routes;
