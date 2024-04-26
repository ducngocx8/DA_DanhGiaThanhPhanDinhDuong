import { combineReducers } from "redux";
import tabReducer from "./tab/tabReducer";
import loginReducer from "./login/loginReducer";

export default combineReducers({
  tabReducer,
  loginReducer,
});