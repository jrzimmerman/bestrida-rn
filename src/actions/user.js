import constants from '../constants/user'

export function successfulLogin (token, userId) {
  return {
    type: constants.USER_LOGIN_SUCCESS,
    payload: {
      loggedIn: true,
      token,
      userId
    }
  }
}
