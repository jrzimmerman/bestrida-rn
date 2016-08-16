import * as constants from '../constants/user'

const initialState = {
  auth: {
    loggedIn: false,
    token: null,
    userId: null
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.USER_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        auth: action.payload
      })
    case constants.USER_LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        auth: {
          loggedIn: false,
          token: null,
          userId: null
        }
      })
    default:
      return state
  }
}
