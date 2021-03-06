import * as constants from '../constants/segments';
import { API_URL } from '../constants/app';

export function getSegment(segmentId) {
  return dispatch => {
    dispatch({
      type: constants.SEGMENT_LOADING
    });
    return fetch(`${API_URL}api/segments/${segmentId}`, {
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
