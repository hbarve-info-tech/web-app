
import { combineReducers } from 'redux';
import user from './user';
import elements from './elements';
import articles from './articles';

export default combineReducers({
  user,
  elements,
  articles,
});
