import * as constants from '../constants/navigation';

export function changeTab(tab) {
  console.log('change tab action');
  return (dispatch) => {
    dispatch({
      type: constants.SELECTED_TAB,
      payload: tab
    });
  };
}
