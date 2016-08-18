import { combineReducers } from 'redux';
import challenges from './challenges';
import efforts from './efforts';
import segments from './segments';
import user from './user';
import storage from './storage';

export default combineReducers({
  challenges,
  efforts,
  segments,
  user,
  storage
});
