import { combineReducers } from "redux";
import ErrorsReducer from "./errors_reducer";
import SessionReducer from "./session_reducer";

const rootReducer = combineReducers({
  errors: ErrorsReducer,
  session: SessionReducer,
});

export default rootReducer;
