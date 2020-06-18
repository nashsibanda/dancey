import {
  RECEIVE_ONE_REVIEW,
  RECEIVE_REVIEWS,
  CLEAR_ONE_REVIEW,
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
    case CLEAR_ONE_REVIEW:
      const dupeReviews = Object.assign({}, state);
      delete dupeReviews[action.review._id];
      return dupeReviews;
    default:
      return state;
  }
};

export default ReviewsReducer;
