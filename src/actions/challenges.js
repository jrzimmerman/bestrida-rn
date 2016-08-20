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
    } else {
      console.log('name: something went wrong!');
    }
    // determine opponent photo
    if (Number(userId) === challenge.challengeeId) {
      // set user photo to challengerPhoto
      console.log(challenge.challengerPhoto);
      if (!challenge.challengerPhoto || challenge.challengerPhoto === 'avatar/athlete/large.png') {
        console.log('challengerPhoto not found');
        opponentPhoto = 'stravaProfilePic';
      } else {
        console.log('set photo as challenger');
        opponentPhoto = { uri: challenge.challengerPhoto };
      }
    } else if (Number(userId) === challenge.challengerId) {
      // set user photo to challengeePhoto
      console.log(challenge.challengeePhoto);
      if (!challenge.challengeePhoto || challenge.challengeePhoto === 'avatar/athlete/large.png') {
        console.log('challengeePhoto not found');
        opponentPhoto = 'stravaProfilePic';
      } else {
        console.log('set photo as challengee');
        opponentPhoto = { uri: challenge.challengeePhoto };
      }
    } else {
      console.log('photo: something went wrong!');
    }
    console.log('opponent name: ', opponentName);
    console.log('opponent photo: ', opponentPhoto);
    const opponentChallenge = { ...challenge, opponentName, opponentPhoto };
    console.log('post-logic: ', opponentChallenge);
    return opponentChallenge;
  });
  return determineOpponentChallenges;
}

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
