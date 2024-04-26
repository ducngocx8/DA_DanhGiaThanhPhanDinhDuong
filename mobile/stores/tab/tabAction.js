export const SET_SELECTION_TAB = "SET_SELECTION_TAB";
export const setSelectedTabSuccess = (selectedTab) => {
  return {
    type: SET_SELECTION_TAB,
    data: { selectedTab: selectedTab },
  };
};
export const setSelectedTab = (selectedTab) => {
  return (dispatch) => {
    dispatch(setSelectedTabSuccess(selectedTab));
  };
};
