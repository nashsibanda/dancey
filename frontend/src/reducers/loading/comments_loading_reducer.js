import {
  COMMENTS_LOADING_ON,
  COMMENTS_LOADING_OFF,
} from "../../actions/loading_actions";

const CommentsLoadingReducer = (state = false, action) => {
  Object.freeze(state);
  switch (action.type) {
    case COMMENTS_LOADING_ON:
      return true;
    case COMMENTS_LOADING_OFF:
      return false;
    default:
      return state;
  }
};

export default CommentsLoadingReducer;
