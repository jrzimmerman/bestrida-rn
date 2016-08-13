import * as constants from '../constants/efforts'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.EFFORTS:
      return state
    default:
      return state
  }
}
