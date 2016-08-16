import * as constants from '../constants/challenges'

const API_URL = 'http://bestrida.herokuapp.com/api/'

export function pendingChallenges (userId) {
  return (dispatch) => {
    dispatch({
      type: constants.PENDING_CHALLENGES,
      payload: { loading: true }
    })

    fetch(`${API_URL}challenges/pending/${userId}`, {
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
  }
}

export function completedChallenges (userId) {
  return (dispatch) => {
    dispatch({
      type: constants.COMPLETED_CHALLENGES,
      payload: { loading: true }
    })

    fetch(`${API_URL}challenges/completed/${userId}`, {
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(challenges => dispatch({
      type: constants.COMPLETED_CHALLENGES,
      payload: {
        loading: false,
        challenges
      }
    }))
  }
}
