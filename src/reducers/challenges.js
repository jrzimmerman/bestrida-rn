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
    console.log('pending loading reducer');
      return Object.assign({}, state, {
        pending: Object.assign({}, state.pending, {
          loading: action.payload
        })
      });
    case constants.PENDING_CHALLENGES_SUCCESS:
      console.log('pending success reducer');
      return Object.assign({}, state, {
        pending: Object.assign({}, state.pending, {
          loading: action.payload.loading,
          challenges: action.payload.challenges
        })
      });
    case constants.PENDING_CHALLENGES_FAILURE:
      console.log('pending failure reducer');
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
