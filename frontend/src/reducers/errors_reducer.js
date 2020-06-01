import { combineReducers } from "redux";
import SessionErrorsReducer from "./errors/session_errors_reducer";
import ReleaseErrorsReducer from "./errors/releases_errors_reducer";
import TracksErrorsReducer from "./errors/tracks_errors_reducer";

const ErrorsReducer = combineReducers({
  session: SessionErrorsReducer,
  releases: ReleaseErrorsReducer,
  tracks: TracksErrorsReducer,
});

export default ErrorsReducer;
