import { parseErrors } from "./error_reducer_utils";
import {
  RECEIVE_PERSONNEL_ERRORS,
  RECEIVE_PERSONNEL,
  RECEIVE_ONE_PERSONNEL,
} from "../../actions/personnel_actions";

const _nullErrors = [];

const PersonnelErrorsReducer = (state = _nullErrors, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_PERSONNEL_ERRORS:
      return parseErrors(action.errors);
    case RECEIVE_PERSONNEL:
      return _nullErrors;
    case RECEIVE_ONE_PERSONNEL:
      return _nullErrors;
    default:
      return state;
  }
};

export default PersonnelErrorsReducer;
