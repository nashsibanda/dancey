import { RECEIVE_RELEASE } from "../../actions/release_actions";
import { RECEIVE_ONE_REVIEW } from "../../actions/review_actions";

const CommentsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_RELEASE:
      const releaseCommentsOutput = {};
      action.release.comments.forEach(comment => {
        releaseCommentsOutput[comment._id] = comment;
      });
      return releaseCommentsOutput;
    case RECEIVE_ONE_REVIEW:
      const reviewCommentsOutput = {};
      action.review.comments.forEach(comment => {
        reviewCommentsOutput[comment._id] = comment;
      });
      return Object.assign({}, state, reviewCommentsOutput);
    default:
      return state;
  }
};

export default CommentsReducer;
