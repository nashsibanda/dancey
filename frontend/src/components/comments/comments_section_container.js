import { connect } from "react-redux";
import CommentsSection from "./comments_section";
import { fetchResourceComments } from "../../actions/comment_actions";

const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated,
  loading: state.loading.comments,
});

const mapDispatchToProps = dispatch => ({
  fetchResourceComments: (resourceType, resourceId) =>
    dispatch(fetchResourceComments(resourceType, resourceId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentsSection);
