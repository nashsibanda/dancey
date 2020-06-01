import { parseErrors } from "./error_reducer_utils";
import {
  RECEIVE_TRACK_ERRORS,
  RECEIVE_TRACK,
  RECEIVE_TRACKS,
} from "../../actions/track_actions";

const _nullErrors = [];

const TracksErrorsReducer = (state = _nullErrors, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_TRACK_ERRORS:
      return parseErrors(action.errors);
    case RECEIVE_TRACK:
      return _nullErrors;
    case RECEIVE_TRACKS:
      return _nullErrors;
    default:
      return state;
  }
};

export default TracksErrorsReducer;
