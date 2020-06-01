import {
  REVIEWS_LOADING_ON,
  REVIEWS_LOADING_OFF,
} from "../../actions/loading_actions";

const ReviewsLoadingReducer = (state = false, action) => {
  Object.freeze(state);
  switch (action.type) {
    case REVIEWS_LOADING_ON:
      return true;
    case REVIEWS_LOADING_OFF:
      return false;
    default:
      return state;
  }
};

export default ReviewsLoadingReducer;
