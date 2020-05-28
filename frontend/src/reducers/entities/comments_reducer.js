import { RECEIVE_RELEASE } from "../../actions/release_actions";

const CommentsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_RELEASE:
      const releaseCommentsOutput = {};
      action.release.comments.forEach(comment => {
        releaseCommentsOutput[comment._id] = comment;
      });
      return releaseCommentsOutput;
    default:
      return state;
  }
};

export default CommentsReducer;
