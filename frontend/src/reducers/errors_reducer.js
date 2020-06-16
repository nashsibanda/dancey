import { combineReducers } from "redux";
import SessionErrorsReducer from "./errors/session_errors_reducer";
import ReleaseErrorsReducer from "./errors/releases_errors_reducer";
import TracksErrorsReducer from "./errors/tracks_errors_reducer";
import PersonnelErrorsReducer from "./errors/personnel_errors_reducer";
import CommentsErrorsReducer from "./errors/comments_errors_reducer";

const ErrorsReducer = combineReducers({
  session: SessionErrorsReducer,
  releases: ReleaseErrorsReducer,
  tracks: TracksErrorsReducer,
  personnel: PersonnelErrorsReducer,
  comments: CommentsErrorsReducer,
});

export default ErrorsReducer;
