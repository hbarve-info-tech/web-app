
// TODO: use any of these libraries to manipulate photos
// https://github.com/oliver-moran/jimp
// https://github.com/EyalAr/lwip
// http://camanjs.com/

import GetImage from './GetImage';
import UploadImage from './UploadImage';

export const Routes = [

  { method: 'GET', path: '/api/elements/{id}/photos/{imageName}', config: GetImage },
  { method: 'POST', path: '/api/elements/{id}/photos', config: UploadImage },

];

export default Routes;
