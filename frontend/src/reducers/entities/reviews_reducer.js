import { RECEIVE_RELEASE } from "../../actions/release_actions";
import { RECEIVE_ONE_REVIEW } from "../../actions/review_actions";

const ReviewsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_RELEASE:
      const releaseReviewsOutput = {};
      action.release.reviews.forEach(review => {
        releaseReviewsOutput[review._id] = review;
      });
      return releaseReviewsOutput;
    case RECEIVE_ONE_REVIEW:
      const { review } = action;
      return Object.assign({}, state, { [review._id]: review });
    default:
      return state;
  }
};

export default ReviewsReducer;
