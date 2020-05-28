import { combineReducers } from "redux";
import ErrorsReducer from "./errors_reducer";
import SessionReducer from "./session_reducer";
import EntitiesReducer from "./entities_reducer";

const rootReducer = combineReducers({
  errors: ErrorsReducer,
  session: SessionReducer,
  entities: EntitiesReducer,
});

export default rootReducer;
