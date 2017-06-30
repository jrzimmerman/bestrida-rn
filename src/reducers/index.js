import { combineReducers } from 'redux';
import challenges from './challenges';
import user from './user';
import segments from './segments';

export default combineReducers({
  challenges,
  user,
  segments
});
