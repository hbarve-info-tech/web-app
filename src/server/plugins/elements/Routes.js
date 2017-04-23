
import SignIn from './SignIn';
import ElementGet from './ElementGet';
import ElementGetById from './ElementGetById';
import ElementCreate from './ElementCreate';

export default [

  { method: 'POST', path: '/api/signin', config: SignIn },

  { method: 'GET', path: '/api/elements', config: ElementGet },
  { method: 'GET', path: '/api/elements/{id}', config: ElementGetById },
  { method: 'POST', path: '/api/elements', config: ElementCreate },

];
