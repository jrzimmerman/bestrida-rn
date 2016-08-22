import * as constants from '../constants/user';

const initialState = {
  auth: {
    loggedIn: false,
    token: null,
    userId: null
  },
  userLoading: false,
  userError: null,
  user: {
    friends: [],
    segments: []
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.USER_AUTH:
      return Object.assign({}, state, {
        auth: action.payload
      });
    case constants.GET_USER_LOADING:
      return Object.assign({}, state, {
        userLoading: action.payload.loading,
        user: initialState.user,
        userError: null
      });
    case constants.GET_USER_SUCCESS:
      return Object.assign({}, state, {
        pending: Object.assign({}, state.pending, {
          loading: action.payload.loading,
          challenges: action.payload.challenges,
          error: null
        })
      });
    case constants.GET_USER_FAILURE:
      return Object.assign({}, state, {
        pending: Object.assign({}, state.pending, {
          loading: action.payload.loading,
          challenges: [],
          error: action.payload.error
        })
      });
    default:
      return state;
  }
};
