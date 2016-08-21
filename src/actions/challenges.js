import * as constants from '../constants/challenges';

const API_URL = 'http://www.bestridaapp.com/api/';

function determineOpponent(userId, challenges) {
  const determineOpponentChallenges = challenges.map((challenge) => {
    // determine opponent name
    let opponentName;
    let opponentPhoto;
    if (Number(userId) === challenge.challengeeId) {
      opponentName = challenge.challengerName;
    } else if (Number(userId) === challenge.challengerId) {
      opponentName = challenge.challengeeName;
    }
    // determine opponent photo
    if (Number(userId) === challenge.challengeeId) {
      // set user photo to challengerPhoto
      if (!challenge.challengerPhoto || challenge.challengerPhoto === 'avatar/athlete/large.png') {
        opponentPhoto = 'stravaProfilePic';
      } else {
        opponentPhoto = { uri: challenge.challengerPhoto };
      }
    } else if (Number(userId) === challenge.challengerId) {
      // set user photo to challengeePhoto
      if (!challenge.challengeePhoto || challenge.challengeePhoto === 'avatar/athlete/large.png') {
        opponentPhoto = 'stravaProfilePic';
      } else {
        opponentPhoto = { uri: challenge.challengeePhoto };
      }
    }

    const opponentChallenge = { ...challenge, opponentName, opponentPhoto };
    return opponentChallenge;
  });
  return determineOpponentChallenges;
}

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
    .then(challenges => determineOpponent(userId, challenges))
    .then(opponentChallenges => {
      dispatch({
        type: constants.PENDING_CHALLENGES_SUCCESS,
        payload: {
          loading: false,
          challenges: opponentChallenges
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

export function activeChallenges(userId) {
  return (dispatch) => {
    dispatch({
      type: constants.ACTIVE_CHALLENGES_LOADING,
      payload: true
    });
    return fetch(`${API_URL}challenges/active/${userId}`, {
      headers: {
        Accept: 'application/json'
      }
    })
    .then(response => response.json())
    .then(challenges => determineOpponent(userId, challenges))
    .then(opponentChallenges => {
      dispatch({
        type: constants.ACTIVE_CHALLENGES_SUCCESS,
        payload: {
          loading: false,
          challenges: opponentChallenges
        }
      });
    })
    .catch(error => {
      dispatch({
        type: constants.ACTIVE_CHALLENGES_FAILURE,
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
      type: constants.COMPLETED_CHALLENGES_LOADING,
      payload: true
    });
    return fetch(`${API_URL}challenges/completed/${userId}`, {
      headers: {
        Accept: 'application/json'
      }
    })
    .then(response => response.json())
    .then(challenges => determineOpponent(userId, challenges))
    .then(opponentChallenges => {
      dispatch({
        type: constants.COMPLETED_CHALLENGES_SUCCESS,
        payload: {
          loading: false,
          challenges: opponentChallenges
        }
      });
    })
    .catch(error => {
      dispatch({
        type: constants.COMPLETED_CHALLENGES_FAILURE,
        payload: {
          loading: false,
          error
        }
      });
    });
  };
}
