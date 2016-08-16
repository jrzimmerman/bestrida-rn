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
    case constants.USER_AUTH:
      return Object.assign({}, state, {
        auth: action.payload
      })
    default:
      return state
  }
}
