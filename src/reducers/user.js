import * as constants from '../constants/user';

const initialState = {
  auth: {
    loggedIn: false,
    token: null,
    userId: null
  },
  userLoading: false,
  userError: null,
  userSegmentsLoading: false,
  userSegmentsError: null,
  userFriendsLoading: false,
  userFriendsError: null,
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
        userLoading: action.payload,
        userError: null
      });
    case constants.GET_USER_SUCCESS:
      return Object.assign({}, state, {
        userLoading: false,
        user: action.payload,
        userError: null
      });
    case constants.GET_USER_FAILURE:
      return Object.assign({}, state, {
        userLoading: false,
        userError: action.payload
      });
    case constants.GET_USER_SEGMENTS_LOADING:
      return Object.assign({}, state, {
        userSegmentsLoading: action.payload,
        userSegmentsError: null
      });
    case constants.GET_USER_SEGMENTS_SUCCESS:
      return Object.assign({}, state, {
        userSegmentsLoading: false,
        userSegmentsError: null
      });
    case constants.GET_USER_SEGMENTS_FAILURE:
      return Object.assign({}, state, {
        userSegmentsLoading: false,
        userSegmentsError: action.payload
      });
    case constants.GET_USER_FRIENDS_LOADING:
      return Object.assign({}, state, {
        userFriendsLoading: action.payload,
        userFriendsError: null
      });
    case constants.GET_USER_FRIENDS_SUCCESS:
      return Object.assign({}, state, {
        userFriendsLoading: false,
        userFriendsError: null
      });
    case constants.GET_USER_FRIENDS_FAILURE:
      return Object.assign({}, state, {
        userFriendsLoading: false,
        userFriendsError: action.payload
      });
    default:
      return state;
  }
};
