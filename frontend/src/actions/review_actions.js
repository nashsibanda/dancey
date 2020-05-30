import { loadingOn, loadingOff } from "./loading_actions";
import * as ReviewAPIUtil from "../util/review_api_util";

export const RECEIVE_ONE_REVIEW = "RECEIVE_ONE_REVIEW";
export const RECEIVE_REVIEW_ERRORS = "RECEIVE_REVIEW_ERRORS";

const receiveOneReview = review => ({
  type: RECEIVE_ONE_REVIEW,
  review,
});

const receiveReviewErrors = errors => ({
  type: RECEIVE_REVIEW_ERRORS,
  errors,
});

export const fetchOneReview = id => dispatch => {
  // dispatch(loadingOn());
  ReviewAPIUtil.getOneReview(id)
    .then(review => {
      dispatch(receiveOneReview(review.data));
      dispatch(loadingOff());
    })
    .catch(err => {
      dispatch(receiveReviewErrors(err.response.data));
      dispatch(loadingOff());
    });
};
