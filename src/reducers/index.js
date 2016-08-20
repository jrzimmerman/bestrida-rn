import { combineReducers } from 'redux';
import challenges from './challenges';
import efforts from './efforts';
import segments from './segments';
import user from './user';
import storage from './storage';
import navigation from './navigation';

export default combineReducers({
  challenges,
  efforts,
  segments,
  user,
  storage,
  navigation
});
