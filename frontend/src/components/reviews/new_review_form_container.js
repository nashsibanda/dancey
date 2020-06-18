import ReviewForm from "./review_form";

const { createNewReview } = require("../../actions/review_actions");
const { connect } = require("react-redux");

const mapStateToProps = state => ({
  currentUser: state.session.user,
});

const mapDispatchToProps = dispatch => ({
  submitReview: (props, state) => {
    const { resourceId, resourceType, currentUser } = props;
    const { body, rating } = state;
    const reviewData = {
      resourceType,
      resourceId,
      body,
      rating,
      userId: currentUser.id,
      username: currentUser.username,
    };
    return dispatch(createNewReview(reviewData));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm);
