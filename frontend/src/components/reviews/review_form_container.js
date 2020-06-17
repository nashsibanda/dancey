import ReviewForm from "./review_form";

const { createNewReview } = require("../../actions/review_actions");
const { connect } = require("react-redux");

const mapStateToProps = state => ({
  currentUser: state.session.user,
});

const mapDispatchToProps = dispatch => ({
  createNewReview: reviewData => dispatch(createNewReview(reviewData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm);
