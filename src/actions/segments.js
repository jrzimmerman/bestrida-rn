import * as constants from '../constants/segments';

const API_URL = 'http://www.bestridaapp.com/api/';

export function getSegment(segmentId) {
  return dispatch => {
    dispatch({
      type: constants.SEGMENT_LOADING
    });

    return fetch(`${API_URL}segments/${segmentId}`, {
      headers: {
        Accept: 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: constants.GET_SEGMENT,
          payload: data
        });
      })
      .catch(error => {
        dispatch({
          type: constants.SEGMENT_ERROR,
          payload: error
        });
      });
  };
}

export function clearSegment() {
  return dispatch => {
    dispatch({
      type: constants.CLEAR_SEGMENT
    });
  };
}
