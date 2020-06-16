import {
  RECEIVE_ONE_COMMENT,
  RECEIVE_COMMENTS,
} from "../../actions/comment_actions";

const CommentsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_COMMENTS:
      const commentsOutput = {};
      action.comments.forEach(comment => {
        commentsOutput[comment._id] = comment;
      });
      return Object.assign({}, state, commentsOutput);
    case RECEIVE_ONE_COMMENT:
      const { comment } = action;
      return Object.assign({}, state, { [comment._id]: comment });
    default:
      return state;
  }
};

export default CommentsReducer;
