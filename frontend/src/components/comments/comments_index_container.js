import { connect } from "react-redux";
import CommentsIndex from "./comments_index";
import {
  fetchResourceComments,
  likeComment,
  deleteComment,
} from "../../actions/comment_actions";

const mapStateToProps = state => ({
  stateComments: state.entities.comments,
  loading: state.loading.comments,
  loggedIn: state.session.isAuthenticated,
  currentUser: state.session.user,
});

const mapDispatchToProps = dispatch => ({
  fetchResourceComments: (resourceType, resourceId) =>
    dispatch(fetchResourceComments(resourceType, resourceId)),
  likeComment: id => dispatch(likeComment(id)),
  deleteComment: id => dispatch(deleteComment(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentsIndex);
