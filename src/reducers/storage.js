import { REHYDRATE } from 'redux-persist/constants'

export default function storage (state = {}, action) {
  switch (action.type) {
    case REHYDRATE:
      console.log('does rehydrate hit??')
      return {
        ...state,
        storageLoaded: true
      }
    default:
      return state
  }
}
