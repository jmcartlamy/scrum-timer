import { combineReducers } from 'redux';
import timerReducer from './timer.js';
import allottedTimeReducer from './allottedTime.js';

export default combineReducers({
  timerReducer,
  allottedTimeReducer
});