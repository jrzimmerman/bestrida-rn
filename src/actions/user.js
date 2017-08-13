import * as constants from '../constants/user';
import { Crashlytics } from 'react-native-fabric';
import { API_URL } from '../constants/app';

export function userLogin(token, userId) {
  return dispatch => {
    dispatch({
      type: constants.USER_AUTH,
      payload: {
        loggedIn: true,
        token,
        userId: Number(userId)
      }
    });
  };
}

export function userLogout() {
  return dispatch => {
    dispatch({
      type: constants.USER_AUTH,
      payload: {
        loggedIn: false,
        token: null,
        userId: null
      }
    });
  };
}

export function getUser(userId) {
  console.log('calling: ', `${API_URL}api/users/${userId}`);
  return dispatch => {
    dispatch({
      type: constants.GET_USER_LOADING,
      payload: true
    });
    return fetch(`${API_URL}api/users/${userId}`, {
      headers: {
        Accept: 'application/json'
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        dispatch({
          type: constants.GET_USER_SUCCESS,
          payload: responseJson
        });
        if (responseJson.fullName)
          Crashlytics.setUserName(responseJson.fullName);
        if (responseJson.email) Crashlytics.setUserEmail(responseJson.email);
        if (responseJson._id)
          Crashlytics.setUserIdentifier(String(responseJson._id));
        Crashlytics.log('Get User: Success');
      })
      .catch(error => {
        dispatch({
          type: constants.GET_USER_FAILURE,
          payload: error
        });
      });
  };
}

export function getUserSegmentsFromStrava(userId) {
  console.log('calling: ', `${API_URL}api/athletes/${userId}/segments`);
  return dispatch => {
    dispatch({
      type: constants.GET_USER_SEGMENTS_LOADING,
      payload: true
    });
    return fetch(`${API_URL}api/athletes/${userId}/segments`, {
      headers: {
        Accept: 'application/json'
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        dispatch({
          type: constants.GET_USER_SEGMENTS_SUCCESS,
          payload: responseJson
        });
        getUser(userId);
      })
      .catch(error => {
        dispatch({
          type: constants.GET_USER_SEGMENTS_FAILURE,
          payload: error
        });
        getUser(userId);
      });
  };
}

export function getUserFriendsFromStrava(userId) {
  console.log('calling: ', `${API_URL}api/athletes/${userId}/friends`);
  return dispatch => {
    dispatch({
      type: constants.GET_USER_FRIENDS_LOADING,
      payload: true
    });
    return fetch(`${API_URL}api/athletes/${userId}/friends`, {
      headers: {
        Accept: 'application/json'
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        dispatch({
          type: constants.GET_USER_FRIENDS_SUCCESS,
          payload: responseJson
        });
        getUser(userId);
      })
      .catch(error => {
        dispatch({
          type: constants.GET_USER_FRIENDS_FAILURE,
          payload: error
        });
        getUser(userId);
      });
  };
}
