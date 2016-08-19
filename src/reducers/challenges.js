import * as constants from '../constants/challenges';

const initialState = {
  pending: {
    loading: false,
    challenges: [],
    error: null
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.PENDING_CHALLENGES_LOADING:
      return Object.assign({}, state, {
        pending: Object.assign({}, state.pending, {
          loading: action.payload
        })
      });
    case constants.PENDING_CHALLENGES_SUCCESS:
      return Object.assign({}, state, {
        pending: Object.assign({}, state.pending, {
          loading: action.payload.loading,
          challenges: action.payload.challenges
        })
      });
    case constants.PENDING_CHALLENGES_FAILURE:
      return Object.assign({}, state, {
        pending: Object.assign({}, state.pending, {
          loading: action.payload.loading,
          error: action.payload.error
        })
      });
    default:
      return state;
  }
};
