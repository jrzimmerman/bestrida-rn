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
      console.log('GET_USER_LOADING');
      return Object.assign({}, state, {
        userLoading: action.payload,
        userError: null
      });
    case constants.GET_USER_SUCCESS:
      console.log('GET_USER_SUCCESS');
      return Object.assign({}, state, {
        userLoading: false,
        user: action.payload,
        userError: null
      });
    case constants.GET_USER_FAILURE:
      console.log('GET_USER_FAILURE');
      return Object.assign({}, state, {
        userLoading: false,
        userError: action.payload
      });
    default:
      return state;
  }
};
