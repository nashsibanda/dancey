import { parseErrors } from "./error_reducer_utils";
import {
  RECEIVE_RELEASE_ERRORS,
  RECEIVE_RELEASE,
  RECEIVE_RELEASES,
} from "../../actions/release_actions";

const _nullErrors = [];

const ReleaseErrorsReducer = (state = _nullErrors, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_RELEASE_ERRORS:
      return parseErrors(action.errors);
    case RECEIVE_RELEASE:
      return _nullErrors;
    case RECEIVE_RELEASES:
      return _nullErrors;
    default:
      return state;
  }
};

export default ReleaseErrorsReducer;
