import * as constants from '../constants/athlete'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.ATHLETE:
      return state
    default:
      return state
  }
}
