
import ElementGet from './ElementGet';
import ElementCreate from './ElementCreate';

export default [

  { method: 'GET', path: '/api/elements', config: ElementGet },
  { method: 'POST', path: '/api/elements', config: ElementCreate },

];
