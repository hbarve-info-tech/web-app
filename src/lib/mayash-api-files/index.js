
export const Routes = [

  { method: 'GET', path: '/api/elements/{id}/files/{imageName}', config: { handler: (request, reply) => reply('Hi there')}  },
  { method: 'POST', path: '/api/elements/{id}/files', config: { handler: (request, reply) => reply('Hi there')}  },
  { method: 'DELETE', path: '/api/elements/{id}/files/{fileName}', config: { handler: (request, reply) => reply('Hi there')} },

  { method: 'GET', path: '/api/posts/{postId}/files/{fileName}', config: { handler: (request, reply) => reply('Hi there')} },
  { method: 'POST', path: '/api/elements/{id}/posts/{postId}/files', config: { handler: (request, reply) => reply('Hi there')} },
  { method: 'DELETE', path: '/api/elements/{id}/posts/{postId}/files/{fileName}', config: { handler: (request, reply) => reply('Hi there')} },

  { method: 'GET', path: '/api/courses/{courseId}/files/{fileName}', config: { handler: (request, reply) => reply('Hi there')} },
  { method: 'POST', path: '/api/elements/{id}/courses/{courseId}/files', config: { handler: (request, reply) => reply('Hi there')} },
  { method: 'DELETE', path: '/api/elements/{id}/courses/{courseId}/files/{fileName}', config: { handler: (request, reply) => reply('Hi there')} },

];

export default Routes;
