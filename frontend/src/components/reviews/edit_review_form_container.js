import ReviewForm from "./review_form";

const { createNewReview, editReview } = require("../../actions/review_actions");
const { connect } = require("react-redux");

const mapStateToProps = state => ({
  currentUser: state.session.user,
});

const mapDispatchToProps = dispatch => ({
  submitReview: (props, state) => {
    const { review } = props;
    const { body, rating } = state;
    const reviewData = {
      body,
      rating,
    };
    return dispatch(editReview(review._id, reviewData));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm);
