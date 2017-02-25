import { combineReducers } from 'redux';
import challenges from './challenges';
import user from './user';

export default combineReducers({
  challenges,
  user
});
