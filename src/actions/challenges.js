import * as constants from '../constants/challenges'

const API_URL = 'http://bestrida.herokuapp.com/api/'

export function pendingChallenges (userId) {
  return (dispatch) => {
    dispatch({
      type: constants.PENDING_CHALLENGES,
      payload: { loading: true }
    })
    return fetch(`${API_URL}challenges/pending/${userId}`, {
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(challenges => dispatch({
      type: constants.PENDING_CHALLENGES,
      payload: {
        loading: false,
        challenges
      }
    }))
    .catch(error => console.log(error))
  }
}

export function completedChallenges (userId) {
  return (dispatch) => {
    dispatch({
      type: constants.COMPLETED_CHALLENGES,
      payload: { loading: true }
    })
    return fetch(`${API_URL}challenges/completed/${userId}`, {
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(challenges => {
      console.log('challenges: ', challenges)
      dispatch({
        type: constants.COMPLETED_CHALLENGES,
        payload: {
          loading: false,
          challenges
        }
      })
    })
    .catch(error => console.log(error))
  }
}
