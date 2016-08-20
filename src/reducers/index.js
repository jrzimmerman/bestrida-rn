import { combineReducers } from 'redux';
import challenges from './challenges';
import segments from './segments';
import user from './user';
import storage from './storage';
import navigation from './navigation';

export default combineReducers({
  challenges,
  segments,
  user,
  storage,
  navigation
});
