import * as constants from '../constants/navigation';

const initialState = {
  selectedTab: 'challengeFeed'
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.SELECTED_TAB:
      return Object.assign({}, state, {
        selectedTab: action.payload
      });
    default:
      return state;
  }
};
