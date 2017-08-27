import * as constants from '../constants/user';

const initialState = {
  auth: {
    loggedIn: false,
    token: null,
    userId: null
  },
  userLoading: false,
  userError: null,
  userReloaded: false,
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
      return {
        ...state,
        auth: action.payload
      };
    case constants.GET_USER_LOADING:
      return {
        ...state,
        userLoading: action.payload,
        userError: null
      };
    case constants.GET_USER_SUCCESS:
      return {
        ...state,
        userLoading: false,
        user: action.payload,
        userError: null
      };
    case constants.GET_USER_FAILURE:
      return {
        ...state,
        userLoading: false,
        userError: action.payload
      };
    case constants.DISMISS_USER_RELOAD:
      return {
        ...state,
        userReloaded: false,
        userError: null
      };
    case constants.RELOAD_USER_LOADING:
      return {
        ...state,
        userLoading: action.payload,
        userError: null,
        userReloaded: false
      };
    case constants.RELOAD_USER_SUCCESS:
      return {
        ...state,
        userLoading: false,
        user: action.payload,
        userError: null,
        userReloaded: true
      };
    case constants.RELOAD_USER_FAILURE:
      return {
        ...state,
        userLoading: false,
        userError: action.payload,
        userReloaded: false
      };
    case constants.GET_USER_SEGMENTS_LOADING:
      return {
        ...state,
        userSegmentsLoading: action.payload,
        userSegmentsError: null
      };
    case constants.GET_USER_SEGMENTS_SUCCESS:
      return {
        ...state,
        userSegmentsLoading: false,
        userSegmentsError: null
      };
    case constants.GET_USER_SEGMENTS_FAILURE:
      return {
        ...state,
        userSegmentsLoading: false,
        userSegmentsError: action.payload
      };
    case constants.GET_USER_FRIENDS_LOADING:
      return {
        ...state,
        userFriendsLoading: action.payload,
        userFriendsError: null
      };
    case constants.GET_USER_FRIENDS_SUCCESS:
      return {
        ...state,
        userFriendsLoading: false,
        userFriendsError: null
      };
    case constants.GET_USER_FRIENDS_FAILURE:
      return {
        ...state,
        userFriendsLoading: false,
        userFriendsError: action.payload
      };
    default:
      return state;
  }
};
