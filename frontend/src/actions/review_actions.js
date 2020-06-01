import { reviewsLoadingOff, reviewsLoadingOn } from "./loading_actions";
import * as ReviewAPIUtil from "../util/review_api_util";

export const RECEIVE_REVIEWS = "RECEIVE_REVIEWS";
export const RECEIVE_ONE_REVIEW = "RECEIVE_ONE_REVIEW";
export const RECEIVE_REVIEW_ERRORS = "RECEIVE_REVIEW_ERRORS";

const receiveReviews = reviews => ({
  type: RECEIVE_REVIEWS,
  reviews,
});

const receiveOneReview = review => ({
  type: RECEIVE_ONE_REVIEW,
  review,
});

const receiveReviewErrors = errors => ({
  type: RECEIVE_REVIEW_ERRORS,
  errors,
});

export const fetchResourceReviews = (resourceType, resourceId) => dispatch => {
  dispatch(reviewsLoadingOn());
  ReviewAPIUtil.getResourceReviews(resourceType, resourceId)
    .then(reviews => {
      dispatch(receiveReviews(reviews.data));
      dispatch(reviewsLoadingOff);
    })
    .catch(err => {
      dispatch(receiveReviewErrors(err.response.data));
      dispatch(reviewsLoadingOff());
    });
};

export const fetchOneReview = id => dispatch => {
  dispatch(reviewsLoadingOn());
  ReviewAPIUtil.getOneReview(id)
    .then(review => {
      dispatch(receiveOneReview(review.data));
      dispatch(reviewsLoadingOff());
    })
    .catch(err => {
      dispatch(receiveReviewErrors(err.response.data));
      dispatch(reviewsLoadingOff());
    });
};
