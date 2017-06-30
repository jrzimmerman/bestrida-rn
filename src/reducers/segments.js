import * as constants from '../constants/segments';

const initialState = {
  segment: null,
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.GET_SEGMENT:
      return {
        ...state,
        segment: action.payload,
        loading: false,
        error: null
      };
    case constants.SEGMENT_LOADING:
      return {
        ...state,
        segment: null,
        loading: true,
        error: null
      };
    case constants.SEGMENT_ERROR:
      return {
        ...state,
        segment: null,
        loading: false,
        error: action.payload
      };
    case constants.CLEAR_SEGMENT:
      return {
        ...state,
        segment: null,
        loading: false,
        error: null
      };
    default:
      return state;
  }
};
