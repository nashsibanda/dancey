import { combineReducers } from "redux";
import ErrorsReducer from "./errors_reducer";

const rootReducer = combineReducers({
  errors: ErrorsReducer,
});

export default rootReducer;
