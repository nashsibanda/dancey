import { connect } from "react-redux";
import { createNewComment } from "../../actions/comment_actions";
import CommentForm from "./comment_form";

const mapStateToProps = state => ({
  currentUser: state.session.user,
});

const mapDispatchToProps = dispatch => ({
  createNewComment: commentData => dispatch(createNewComment(commentData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
