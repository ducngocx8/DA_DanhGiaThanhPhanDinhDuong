export const SET_USER_LOGIN = "SET_USER_LOGIN";
export const setUserLoginSuccess = (userLogin) => {
  return {
    type: SET_USER_LOGIN,
    data: { userLogin: userLogin },
  };
};
export const setUserLogin = (userLogin) => {
  return (dispatch) => {
    dispatch(setUserLoginSuccess(userLogin));
  };
};
