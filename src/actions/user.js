import * as constants from '../constants/user';

const API_URL = 'http://www.bestridaapp.com/api/';

export function userLogin(token, userId) {
  return (dispatch) => {
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
  return (dispatch) => {
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
  return (dispatch) => {
    dispatch({
      type: constants.GET_USER_LOADING,
      payload: true
    });
    return fetch(`${API_URL}users/${userId}`, {
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
    })
    .catch(error => {
      dispatch({
        type: constants.GET_USER_FAILURE,
        payload: error
      });
    });
  };
}
