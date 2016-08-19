import * as constants from '../constants/challenges';

const API_URL = 'https://bestrida.herokuapp.com/api/';

export function pendingChallenges(userId) {
  return (dispatch) => {
    dispatch({
      type: constants.PENDING_CHALLENGES_LOADING,
      payload: true
    });
    return fetch(`${API_URL}challenges/pending/${userId}`, {
      headers: {
        Accept: 'application/json'
      }
    })
    .then(response => response.json())
    .then(challenges => {
      console.log('pending: ', challenges)
      dispatch({
        type: constants.PENDING_CHALLENGES_SUCCESS,
        payload: {
          loading: false,
          challenges
        }
      });
    })
    .catch(error => {
      dispatch({
        type: constants.PENDING_CHALLENGES_FAILURE,
        payload: {
          loading: false,
          error
        }
      });
    });
  };
}

export function completedChallenges(userId) {
  return (dispatch) => {
    dispatch({
      type: constants.COMPLETED_CHALLENGES,
      payload: { loading: true }
    });
    return fetch(`${API_URL}challenges/completed/${userId}`, {
      headers: {
        Accept: 'application/json'
      }
    })
    .then(response => response.json())
    .then(challenges => {
      console.log('challenges: ', challenges);
      dispatch({
        type: constants.COMPLETED_CHALLENGES,
        payload: {
          loading: false,
          challenges
        }
      });
    })
    .catch(error => console.log(error));
  };
}