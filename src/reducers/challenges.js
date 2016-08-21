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
      return Object.assign({}, state, {
        pending: Object.assign({}, state.pending, {
          loading: action.payload,
          error: null
        })
      });
    case constants.PENDING_CHALLENGES_SUCCESS:
      return Object.assign({}, state, {
        pending: Object.assign({}, state.pending, {
          loading: action.payload.loading,
          challenges: action.payload.challenges,
          error: null
        })
      });
    case constants.PENDING_CHALLENGES_FAILURE:
      return Object.assign({}, state, {
        pending: Object.assign({}, state.pending, {
          loading: action.payload.loading,
          challenges: [],
          error: action.payload.error
        })
      });
    case constants.ACTIVE_CHALLENGES_LOADING:
      return Object.assign({}, state, {
        active: Object.assign({}, state.active, {
          loading: action.payload,
          error: null
        })
      });
    case constants.ACTIVE_CHALLENGES_SUCCESS:
      return Object.assign({}, state, {
        active: Object.assign({}, state.active, {
          loading: action.payload.loading,
          challenges: action.payload.challenges,
          error: null
        })
      });
    case constants.ACTIVE_CHALLENGES_FAILURE:
      return Object.assign({}, state, {
        active: Object.assign({}, state.active, {
          loading: action.payload.loading,
          challenges: [],
          error: action.payload.error
        })
      });
    case constants.COMPLETED_CHALLENGES_LOADING:
      return Object.assign({}, state, {
        completed: Object.assign({}, state.completed, {
          loading: action.payload,
          error: null
        })
      });
    case constants.COMPLETED_CHALLENGES_SUCCESS:
      return Object.assign({}, state, {
        completed: Object.assign({}, state.completed, {
          loading: action.payload.loading,
          challenges: action.payload.challenges,
          error: null
        })
      });
    case constants.COMPLETED_CHALLENGES_FAILURE:
      return Object.assign({}, state, {
        completed: Object.assign({}, state.completed, {
          loading: action.payload.loading,
          challenges: [],
          error: action.payload.error
        })
      });
    case constants.ACCEPT_CHALLENGE_SUCCESS:
      return Object.assign({}, state, {
        accept: Object.assign({}, state.accept, {
          response: action.payload,
          error: null
        })
      });
    case constants.ACCEPT_CHALLENGE_FAILURE:
      return Object.assign({}, state, {
        accept: Object.assign({}, state.accept, {
          response: null,
          error: action.payload
        })
      });
    case constants.DECLINE_CHALLENGE_SUCCESS:
      return Object.assign({}, state, {
        decline: Object.assign({}, state.decline, {
          response: action.payload,
          error: null
        })
      });
    case constants.DECLINE_CHALLENGE_FAILURE:
      return Object.assign({}, state, {
        decline: Object.assign({}, state.decline, {
          response: null,
          error: action.payload
        })
      });
    case constants.COMPLETE_CHALLENGE_SUCCESS:
      return Object.assign({}, state, {
        complete: Object.assign({}, state.complete, {
          response: action.payload,
          error: null
        })
      });
    case constants.COMPLETE_CHALLENGE_FAILURE:
      return Object.assign({}, state, {
        complete: Object.assign({}, state.complete, {
          response: null,
          error: action.payload
        })
      });
    case constants.CREATE_CHALLENGE_SUCCESS:
      return Object.assign({}, state, {
        create: Object.assign({}, state.create, {
          response: action.payload,
          error: null
        })
      });
    case constants.CREATE_CHALLENGE_FAILURE:
      return Object.assign({}, state, {
        create: Object.assign({}, state.create, {
          response: null,
          error: action.payload
        })
      });
    default:
      return state;
  }
};
