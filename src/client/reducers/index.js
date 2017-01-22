
import { combineReducers } from 'redux';
import user from './user';
import articles from './articles';

export default combineReducers({
  user,
  articles,
});
