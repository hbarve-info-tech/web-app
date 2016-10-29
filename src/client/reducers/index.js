'use strict';
import { combineReducers } from 'redux';
import user     from './user';
import courses  from './courses';
import articles from './articles';

const rootReducer = combineReducers({
  user,
  courses,
  articles
});

export default rootReducer;