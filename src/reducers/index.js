import { combineReducers } from 'redux';
import challenges from './challenges';
import user from './user';
import storage from './storage';
import navigation from './navigation';

export default combineReducers({
  challenges,
  user,
  storage,
  navigation
});
