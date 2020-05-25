import { combineReducers } from "redux";
import ErrorsReducer from "./errors_reducer";
import SessionReducer from "./session_reducer";
import ReleasesReducer from "./releases_reducer";

const rootReducer = combineReducers({
  errors: ErrorsReducer,
  session: SessionReducer,
  releases: ReleasesReducer,
});

export default rootReducer;
