import * as constants from '../constants/challenges';

const API_URL = 'http://www.bestridaapp.com/api/';

export function pendingChallenges(userId) {
  console.log('pending action');
  console.log('userId: ', userId);
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
      challenges.map((challenge) => (
        challenge.opponent = userId === challenge.challengeeId ? challenge.challengerName : challenge.challengeeName
      ));
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
