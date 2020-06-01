import { RECEIVE_RELEASE } from "../../actions/release_actions";
import {
  RECEIVE_ONE_REVIEW,
  RECEIVE_REVIEWS,
} from "../../actions/review_actions";

const ReviewsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_REVIEWS:
      const reviewsOutput = {};
      action.reviews.forEach(review => {
        reviewsOutput[review._id] = review;
      });
      return Object.assign({}, state, reviewsOutput);
    case RECEIVE_ONE_REVIEW:
      const { review } = action;
      return Object.assign({}, state, { [review._id]: review });
    default:
      return state;
  }
};

export default ReviewsReducer;
