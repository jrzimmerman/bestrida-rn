import * as constants from '../constants/challenges';

const initialState = {
  pending: {
    loading: false,
    challenges: [],
    error: null
  },
  active: {
    loading: false,
    challenges: [],
    error: null
  },
  completed: {
    loading: false,
    challenges: [],
    error: null
  },
  accept: {
    response: null,
    error: null
  },
  decline: {
    response: null,
    error: null
  },
  complete: {
    response: null,
    error: null
  },
  create: {
    response: null,
    error: null
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.PENDING_CHALLENGES_LOADING:
      return {
        ...state,
        pending: {
          ...state.pending,
          loading: action.payload,
          error: null
        }
      };
    case constants.PENDING_CHALLENGES_SUCCESS:
      return {
        ...state,
        pending: {
          ...state.pending,
          loading: action.payload.loading,
          challenges: action.payload.challenges,
          error: null
        }
      };
    case constants.PENDING_CHALLENGES_FAILURE:
      return {
        ...state,
        pending: {
          ...state.pending,
          loading: action.payload.loading,
          challenges: [],
          error: action.payload.error
        }
      };
    case constants.ACTIVE_CHALLENGES_LOADING:
      return {
        ...state,
        active: {
          ...state.active,
          loading: action.payload,
          error: null
        }
      };
    case constants.ACTIVE_CHALLENGES_SUCCESS:
      return {
        ...state,
        active: {
          ...state.active,
          loading: action.payload.loading,
          challenges: action.payload.challenges,
          error: null
        }
      };
    case constants.ACTIVE_CHALLENGES_FAILURE:
      return {
        ...state,
        active: {
          ...state.active,
          loading: action.payload.loading,
          challenges: [],
          error: action.payload.error
        }
      };
    case constants.COMPLETED_CHALLENGES_LOADING:
      return {
        ...state,
        completed: {
          ...state.completed,
          loading: action.payload,
          error: null
        }
      };
    case constants.COMPLETED_CHALLENGES_SUCCESS:
      return {
        ...state,
        completed: {
          ...state.completed,
          loading: action.payload.loading,
          challenges: action.payload.challenges,
          error: null
        }
      };
    case constants.COMPLETED_CHALLENGES_FAILURE:
      return {
        ...state,
        completed: {
          ...state.completed,
          loading: action.payload.loading,
          challenges: [],
          error: action.payload.error
        }
      };
    case constants.ACCEPT_CHALLENGE_SUCCESS:
      return {
        ...state,
        accept: {
          ...state.accept,
          response: action.payload,
          error: null
        }
      };
    case constants.ACCEPT_CHALLENGE_FAILURE:
      return {
        ...state,
        accept: {
          ...state.accept,
          response: null,
          error: action.payload
        }
      };
    case constants.DECLINE_CHALLENGE_SUCCESS:
      return {
        ...state,
        decline: {
          ...state.decline,
          response: action.payload,
          error: null
        }
      };
    case constants.DECLINE_CHALLENGE_FAILURE:
      return {
        ...state,
        decline: {
          ...state.decline,
          response: null,
          error: action.payload
        }
      };
    case constants.COMPLETE_CHALLENGE_SUCCESS:
      return {
        ...state,
        complete: {
          ...state.complete,
          response: action.payload,
          error: null
        }
      };
    case constants.COMPLETE_CHALLENGE_FAILURE:
      return {
        ...state,
        complete: {
          ...state.complete,
          response: null,
          error: action.payload
        }
      };
    case constants.CLEAR_COMPLETE_ERROR:
      return {
        ...state,
        complete: {
          ...state.complete,
          error: null
        }
      };
    case constants.CREATE_CHALLENGE_SUCCESS:
      return {
        ...state,
        create: {
          ...state.create,
          response: action.payload,
          error: null
        }
      };
    case constants.CREATE_CHALLENGE_FAILURE:
      return {
        ...state,
        create: {
          ...state.create,
          response: null,
          error: action.payload
        }
      };
    default:
      return state;
  }
};
