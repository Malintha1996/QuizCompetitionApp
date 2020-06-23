import { combineReducers } from "redux";
import auth from "./authReducer";
import question from "./questionReducer"

export default combineReducers({auth: auth, question:question});
