'use strict';
import { combineReducers } from 'redux';
import user     from './user';
import elements from './elements';
import courses  from './courses';
import articles from './articles';

const rootReducer = combineReducers({
  user,
  elements,
  courses,
  articles
});

export default rootReducer;