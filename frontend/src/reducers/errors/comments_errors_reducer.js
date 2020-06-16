import { parseErrors } from "./error_reducer_utils";
import {
  RECEIVE_COMMENT_ERRORS,
  RECEIVE_ONE_COMMENT,
  RECEIVE_COMMENTS,
} from "../../actions/comment_actions";

const _nullErrors = [];

const CommentsErrorsReducer = (state = _nullErrors, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_COMMENT_ERRORS:
      return parseErrors(action.errors);
    case RECEIVE_ONE_COMMENT:
      return _nullErrors;
    case RECEIVE_COMMENTS:
      return _nullErrors;
    default:
      return state;
  }
};

export default CommentsErrorsReducer;
