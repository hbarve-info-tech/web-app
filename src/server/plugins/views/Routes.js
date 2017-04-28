
import Home from './Home';
import Elements from './Elements';
import Article from './Article';
import Post from './Post';
import Course from './Course';
import Classroom from './Classroom';

import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import Motivation from './Motivation';
import CustomerReviews from './CustomerReviews';
import Introduction from './Introduction';
import ProductAndServices from './ProductAndServices';
import Sponsors from './Sponsors';
import Team from './Team';
import Others from './Others';

export default [
  { method: 'GET', path: '/', config: Home },

  // { method: 'GET', path: '/contact-us', config: ContactUs },
  //
  // { method: 'GET', path: '/articles/{articleId}', config: Article },
  // { method: 'GET', path: '/posts/{postId}', config: Post },
  // { method: 'GET', path: '/courses/{courseId}', config: Course },
  //
  // { method: 'GET', path: '/{username}', config: Elements },
  // { method: 'GET', path: '/{username}/classroom', config: Classroom },

  { method: 'GET', path: '/public/{url*}', handler: { directory: { path: 'public' } } },
  { method: 'GET', path: '/{url*}', config: Others },
  { method: 'GET', path: '/favicon.ico', handler: (request, reply) => reply.file('./favicon.ico') },
];
