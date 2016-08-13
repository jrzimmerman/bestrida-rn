import { combineReducers } from 'redux'
import challenges from './challenges'
import efforts from './efforts'
import segments from './segments'
import users from './users'

export default combineReducers({
  challenges,
  efforts,
  segments,
  users
})
