import * as constants from '../constants/navigation';

export function changeTab(tab) {
  return (dispatch) => {
    dispatch({
      type: constants.SELECTED_TAB,
      payload: tab
    });
  };
}
