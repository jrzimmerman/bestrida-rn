import * as constants from '../constants/challenges';
import * as navigationActions from './navigation';

const API_URL = 'http://localhost:8000/api/';

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

function completionStatus(userId, challenges) {
  const completedStatusChallenges = challenges.map((challenge) => {
    let completedStatus;
    if (challenge.challengeeCompleted && challenge.challengerCompleted) {
      if (Number(userId) === challenge.winnerId) {
        completedStatus = 'You won this challenge!';
      } else if (Number(userId) === challenge.loserId) {
        completedStatus = 'You lost this challenge.';
      } else {
        completedStatus = 'Challenge is still calculating.';
      }
    } else {
      completedStatus = 'Waiting for opponent.';
    }
    const challengeStatus = { ...challenge, completedStatus };
    return challengeStatus;
  });
  return completedStatusChallenges;
}

export function pendingChallenges(userId) {
  console.log('pending challenges');
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
  console.log('getting active challenges');
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
  console.log('getting completed challenges');
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
    .then(opponentChallenges => completionStatus(userId, opponentChallenges))
    .then(completedStatusChallenges => {
      dispatch({
        type: constants.COMPLETED_CHALLENGES_SUCCESS,
        payload: {
          loading: false,
          challenges: completedStatusChallenges
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

export function acceptChallenge(challengeId, userId) {
  console.log('accept challenge action');
  return (dispatch) => {
    fetch(`${API_URL}challenges/accept`, {
      method: 'POST',
      body: JSON.stringify({
        id: challengeId
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(responseJson => {
      dispatch({
        type: constants.ACCEPT_CHALLENGE_SUCCESS,
        payload: {
          response: responseJson
        }
      });
    })
    .then(dispatch(activeChallenges(userId)))
    .then(dispatch(navigationActions.changeTab('activeChallenges')))
    .catch(error => {
      console.log('accept error: ', error);
      dispatch({
        type: constants.ACCEPT_CHALLENGE_FAILURE,
        payload: {
          error
        }
      });
    });
  };
}

export function declineChallenge(challengeId, userId) {
  console.log('decline challenge action');
  return (dispatch) => {
    fetch(`${API_URL}challenges/decline`, {
      method: 'POST',
      body: JSON.stringify({
        id: challengeId
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(responseJson => {
      dispatch({
        type: constants.DECLINE_CHALLENGE_SUCCESS,
        payload: {
          response: responseJson
        }
      });
    })
    .then(dispatch(pendingChallenges(userId)))
    .catch(error => {
      console.log('decline error: ', error);
      dispatch({
        type: constants.DECLINE_CHALLENGE_FAILURE,
        payload: {
          error
        }
      });
    });
  };
}

export function completeChallenge(challengeId, userId) {
  console.log('complete challenge');
  return (dispatch) => {
    fetch(`${API_URL}challenges/complete`, {
      method: 'POST',
      body: JSON.stringify({
        id: challengeId,
        userId
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(responseJson => {
      console.log('response: ', responseJson);
      try {
        if (responseJson.error) {
          throw new Error(responseJson.error);
        }
        dispatch({
          type: constants.COMPLETE_CHALLENGE_SUCCESS,
          payload: {
            response: responseJson
          }
        });
      } catch (error) {
        console.log('catch response error');
        dispatch({
          type: constants.COMPLETE_CHALLENGE_FAILURE,
          payload: {
            error
          }
        });
      }
    })
    .then(dispatch(completedChallenges(userId)))
    .catch(error => {
      console.log('complete error: ', error);
      dispatch({
        type: constants.COMPLETE_CHALLENGE_FAILURE,
        payload: {
          error
        }
      });
    });
  };
}

export function clearCompleteError() {
  return (dispatch) => {
    console.log('clear error');
    dispatch({ type: constants.CLEAR_COMPLETE_ERROR });
  };
}

export function createChallenge(user, challengee, segment, completionDate) {
  console.log('create challenge');
  return (dispatch) => {
    fetch(`${API_URL}challenges/create`, {
      method: 'POST',
      body: JSON.stringify({
        segmentId: segment._id,
        segmentName: segment.name,
        challengerId: user._id,
        challengerName: user.fullName,
        challengerPhoto: user.photo,
        challengeeId: challengee.id,
        challengeeName: challengee.fullName,
        challengeePhoto: challengee.photo,
        completionDate
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(responseJson => {
      dispatch({
        type: constants.CREATE_CHALLENGE_SUCCESS,
        payload: {
          response: responseJson
        }
      });
    })
    .catch(error => {
      dispatch({
        type: constants.CREATE_CHALLENGE_FAILURE,
        payload: {
          error
        }
      });
    });
  };
}
