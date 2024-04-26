import * as tabActionTypes from "./tabAction";

const initalState = {
  selectedTab: {
    code: "Nutrition",
    title: "Thực phẩm",
  },
};

const tabReducer = (state = initalState, action) => {
  switch (action.type) {
    case tabActionTypes.SET_SELECTION_TAB:
      return { ...state, selectedTab: action.data.selectedTab };
    default:
      return state;
  }
};

export default tabReducer;
