import { connect } from "react-redux";
import { createNewComment } from "../../actions/comment_actions";
import CommentForm from "./comment_form";

const mapDispatchToProps = dispatch => ({
  createNewComment: commentData => dispatch(createNewComment(commentData)),
});

export default connect(null, mapDispatchToProps)(CommentForm);
