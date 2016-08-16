import * as constants from '../constants/user'

export function userLogin (token, userId) {
  return {
    type: constants.USER_AUTH,
    payload: {
      loggedIn: true,
      token,
      userId
    }
  }
}

export function userLogout () {
  return {
    type: constants.USER_AUTH,
    payload: {
      loggedIn: false,
      token: null,
      userId: null
    }
  }
}
