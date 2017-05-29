
import { combineReducers } from 'redux';

import elements from './elements';
import posts from './posts';
import courses from './courses';

export default combineReducers({
  elements,
  posts,
  courses,
});
