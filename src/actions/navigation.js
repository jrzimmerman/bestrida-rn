import * as constants from '../constants/navigation';

export function changeTab(tab) {
  console.log('changing tab: ', tab);
  return (dispatch) => {
    dispatch({
      type: constants.SELECTED_TAB,
      payload: tab
    });
  };
}

export default changeTab;
