import { Answers } from 'react-native-fabric';
import moment from 'moment';
import * as constants from '../constants/challenges';
import { API_URL } from '../constants/app';

function determineOpponent(userId, challenges) {
  const determineOpponentChallenges = challenges.map(challenge => {
    // determine opponent name
    let opponentName;
    let opponentPhoto;
    if (Number(userId) === challenge.challengee.id) {
      opponentName = challenge.challenger.name;
    } else if (Number(userId) === challenge.challenger.id) {
      opponentName = challenge.challengee.name;
    }
    // determine opponent photo
    if (Number(userId) === challenge.challengee.id) {
      // set user photo to challengerPhoto
      if (
        !challenge.challenger.photo ||
        challenge.challenger.photo === 'avatar/athlete/large.png'
      ) {
        opponentPhoto = 'stravaProfilePic';
      } else {
        opponentPhoto = { uri: challenge.challenger.photo };
      }
    } else if (Number(userId) === challenge.challenger.id) {
      // set user photo to challengeePhoto
      if (
        !challenge.challengee.photo ||
        challenge.challengee.photo === 'avatar/athlete/large.png'
      ) {
        opponentPhoto = 'stravaProfilePic';
      } else {
        opponentPhoto = { uri: challenge.challengee.photo };
      }
    }

    const opponentChallenge = { ...challenge, opponentName, opponentPhoto };
    return opponentChallenge;
  });
  return determineOpponentChallenges;
}

function completionStatus(userId, challenges) {
  const completedStatusChallenges = challenges.map(challenge => {
    let completedStatus;
    if (challenge.challengee.completed && challenge.challenger.completed) {
      if (Number(userId) === challenge.winnerId) {
        completedStatus = 'You won this challenge!';
      } else if (Number(userId) === challenge.loserId) {
        completedStatus = 'You lost this challenge.';
      } else {
        completedStatus = 'Determining Winner, check back soon!';
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
  return dispatch => {
    dispatch({
      type: constants.PENDING_CHALLENGES_LOADING,
      payload: true
    });
    console.log(
      'calling: ',
      `${API_URL}api/users/${userId}/challenges/pending`
    );
    return fetch(`${API_URL}api/users/${userId}/challenges/pending`, {
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
  return dispatch => {
    dispatch({
      type: constants.ACTIVE_CHALLENGES_LOADING,
      payload: true
    });
    console.log('calling: ', `${API_URL}api/users/${userId}/challenges/active`);
    return fetch(`${API_URL}api/users/${userId}/challenges/active`, {
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
  return dispatch => {
    dispatch({
      type: constants.COMPLETED_CHALLENGES_LOADING,
      payload: true
    });
    console.log(
      'calling: ',
      `${API_URL}api/users/${userId}/challenges/completed`
    );
    return fetch(`${API_URL}api/users/${userId}/challenges/completed`, {
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
  return dispatch => {
    console.log('calling: ', `${API_URL}api/challenges/accept`);
    fetch(`${API_URL}api/challenges/accept`, {
      method: 'PUT',
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
        Answers.logCustom('Accept Challenge: Success', { challengeId, userId });
      })
      .then(dispatch(activeChallenges(userId)))
      // navigate back to active challenges
      .catch(error => {
        dispatch({
          type: constants.ACCEPT_CHALLENGE_FAILURE,
          payload: {
            error
          }
        });
        Answers.logCustom('Accept Challenge: Failure', { challengeId, userId });
      });
  };
}

export function declineChallenge(challengeId, userId) {
  return dispatch => {
    console.log('calling: ', `${API_URL}api/challenges/decline`);
    fetch(`${API_URL}api/challenges/decline`, {
      method: 'PUT',
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
        Answers.logCustom('Decline Challenge: Success', {
          challengeId,
          userId
        });
      })
      .then(dispatch(pendingChallenges(userId)))
      .catch(error => {
        dispatch({
          type: constants.DECLINE_CHALLENGE_FAILURE,
          payload: {
            error
          }
        });
        Answers.logCustom('Decline Challenge: Failure', {
          challengeId,
          userId
        });
      });
  };
}

export function completeChallenge(challengeId, userId) {
  return dispatch => {
    console.log('calling: ', `${API_URL}api/challenges/complete`);
    fetch(`${API_URL}api/challenges/complete`, {
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
          Answers.logCustom('Complete Challenge: Success', {
            challengeId,
            userId
          });
        } catch (error) {
          dispatch({
            type: constants.COMPLETE_CHALLENGE_FAILURE,
            payload: {
              error
            }
          });
          Answers.logCustom('Complete Challenge: Failure', {
            challengeId,
            userId
          });
        }
      })
      .then(dispatch(completedChallenges(userId)))
      .catch(error => {
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
  return dispatch => {
    dispatch({ type: constants.CLEAR_COMPLETE_ERROR });
  };
}

export function createChallenge(user, challengee, segment, completionDate) {
  return dispatch => {
    console.log('calling: ', `${API_URL}api/challenges/create`);
    console.log('segmentId: ', segment.id);
    console.log('challengerId: ', user.id);
    console.log('challengeeId: ', challengee.id);
    console.log('completionDate: ', `${moment(completionDate).unix()}`);
    fetch(`${API_URL}api/challenges/create`, {
      method: 'POST',
      body: JSON.stringify({
        segmentId: segment.id,
        challengerId: user.id,
        challengeeId: challengee.id,
        completionDate: `${moment(completionDate).unix()}`
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
        console.log('created challenge successfully');
        Answers.logCustom('Create Challenge: Success', {
          user,
          challengee,
          segment,
          completionDate
        });
      })
      .catch(error => {
        dispatch({
          type: constants.CREATE_CHALLENGE_FAILURE,
          payload: {
            error
          }
        });
        console.log('failed to created challenge');
        Answers.logCustom('Create Challenge: Failure', {
          user,
          challengee,
          segment,
          completionDate
        });
      });
  };
}
