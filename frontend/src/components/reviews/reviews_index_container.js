import { connect } from "react-redux";
import ReviewsIndex from "./reviews_index";
import {
  fetchOneReview,
  fetchResourceReviews,
  likeReview,
  deleteReview,
} from "../../actions/review_actions";
import { fetchResourceComments } from "../../actions/comment_actions";

const mapStateToProps = state => ({
  stateReviews: state.entities.reviews,
  loading: state.loading.reviews,
  loggedIn: state.session.isAuthenticated,
  currentUser: state.session.user,
});

const mapDispatchToProps = dispatch => ({
  fetchOneReview: id => dispatch(fetchOneReview(id)),
  fetchResourceReviews: (resourceType, resourceId) =>
    dispatch(fetchResourceReviews(resourceType, resourceId)),
  fetchResourceComments: (resourceType, resourceId) =>
    dispatch(fetchResourceComments(resourceType, resourceId)),
  likeReview: id => dispatch(likeReview(id)),
  deleteReview: id => dispatch(deleteReview(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewsIndex);
