import { connect } from "react-redux";
import CommentsIndex from "./comments_index";
import { fetchResourceComments } from "../../actions/comment_actions";

const mapStateToProps = state => ({
  stateComments: state.entities.comments,
  loading: state.loading.comments,
  loggedIn: state.session.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  fetchResourceComments: (resourceType, resourceId) =>
    dispatch(fetchResourceComments(resourceType, resourceId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentsIndex);
