import * as constants from '../constants/challenges';

const initialState = {
  pending: {
    loading: false,
    challenges: []
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.PENDING_CHALLENGES:
      return Object.assign({}, state, {
        pending: action.payload
      });
    default:
      return state;
  }
};
