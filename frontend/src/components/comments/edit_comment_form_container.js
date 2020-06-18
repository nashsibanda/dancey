import { connect } from "react-redux";
import { editComment } from "../../actions/comment_actions";
import CommentForm from "./comment_form";

const mapStateToProps = state => ({
  currentUser: state.session.user,
  newComment: false,
});

const mapDispatchToProps = dispatch => ({
  submitComment: (props, state) => {
    const { comment } = props;
    const { body } = state;
    const commentData = { body };
    return dispatch(editComment(comment._id, commentData));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
