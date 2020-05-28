import { RECEIVE_RELEASE } from "../../actions/release_actions";

const ReviewsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_RELEASE:
      const releaseReviewsOutput = {};
      action.release.reviews.forEach(review => {
        releaseReviewsOutput[review._id] = review;
      });
      return releaseReviewsOutput;
    default:
      return state;
  }
};

export default ReviewsReducer;
