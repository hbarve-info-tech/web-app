
import { combineReducers } from 'redux';
import user from './user';
import elements from './elements';
import posts from './posts';
import articles from './articles';
import courses from './courses';

export default combineReducers({
  user,
  elements,
  posts,
  articles,
  courses,
});
