
import { combineReducers } from 'redux';

import create from './create';
import elements from './elements';
import posts from './posts';
import courses from './courses';

export default combineReducers({
  create,
  elements,
  posts,
  courses,
});
