import { connect } from "react-redux";
import { createNewComment } from "../../actions/comment_actions";
import CommentForm from "./comment_form";

const mapStateToProps = state => ({
  currentUser: state.session.user,
  newComment: true,
});

const mapDispatchToProps = dispatch => ({
  submitComment: (props, state) => {
    const { resourceId, resourceType, parentCommentId, currentUser } = props;
    const { body } = state;
    const commentData = {
      resourceType,
      resourceId,
      body,
      parentCommentId,
      userId: currentUser.id,
      username: currentUser.username,
    };
    return dispatch(createNewComment(commentData));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
