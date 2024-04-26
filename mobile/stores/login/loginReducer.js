import * as loginActionTypes from "./loginAction";

const initalState = {
  // userLogin: {
  //   username: "",
  //   image_url: " chủ",
  // },
  userLogin: null,
};

const loginReducer = (state = initalState, action) => {
  switch (action.type) {
    case loginActionTypes.SET_USER_LOGIN:
      return { ...state, userLogin: action.data.userLogin };
    default:
      return state;
  }
};

export default loginReducer;
