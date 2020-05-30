import { connect } from "react-redux";
import ReviewsIndex from "./reviews_index";
import { fetchOneReview } from "../../actions/review_actions";

const mapStateToProps = state => ({
  stateReviews: state.entities.reviews,
});

const mapDispatchToProps = dispatch => ({
  fetchOneReview: id => dispatch(fetchOneReview(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewsIndex);
