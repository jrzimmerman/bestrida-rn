import { combineReducers } from 'redux';
import challenges from './challenges';
import user from './user';
import navigation from './navigation';

export default combineReducers({
  challenges,
  user,
  navigation
});
