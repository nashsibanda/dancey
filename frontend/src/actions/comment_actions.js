import { commentsLoadingOff, commentsLoadingOn } from "./loading_actions";
import * as CommentAPIUtil from "../util/comment_api_util";

export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const RECEIVE_ONE_COMMENT = "RECEIVE_ONE_COMMENT";
export const REMOVE_ONE_COMMENT = "REMOVE_ONE_COMMENT";
export const RECEIVE_COMMENT_ERRORS = "RECEIVE_COMMENT_ERRORS";

const receiveComments = comments => ({
  type: RECEIVE_COMMENTS,
  comments,
});

const receiveOneComment = comment => ({
  type: RECEIVE_ONE_COMMENT,
  comment,
});

const receiveCommentErrors = errors => ({
  type: RECEIVE_COMMENT_ERRORS,
  errors,
});

export const fetchResourceComments = (resourceType, resourceId) => dispatch => {
  dispatch(commentsLoadingOn());
  CommentAPIUtil.getResourceComments(resourceType, resourceId)
    .then(comments => {
      dispatch(receiveComments(comments.data));
      dispatch(commentsLoadingOff());
    })
    .catch(err => {
      dispatch(receiveCommentErrors(err.response.data));
      dispatch(commentsLoadingOff());
    });
};

export const fetchOneComment = id => dispatch => {
  dispatch(commentsLoadingOn());
  CommentAPIUtil.getOneComment(id)
    .then(comment => {
      dispatch(receiveOneComment(comment.data));
      dispatch(commentsLoadingOff());
    })
    .catch(err => {
      dispatch(receiveCommentErrors(err.response.data));
      dispatch(commentsLoadingOff());
    });
};

export const createNewComment = commentData => dispatch => {
  CommentAPIUtil.postComment(commentData)
    .then(comment => dispatch(receiveOneComment(comment.data)))
    .catch(err => dispatch(receiveCommentErrors(err.response.data)));
};

export const likeComment = id => dispatch => {
  CommentAPIUtil.putCommentLike(id)
    .then(comment => dispatch(receiveOneComment(comment.data)))
    .catch(err => dispatch(receiveCommentErrors(err.response.data)));
};

export const deleteComment = id => dispatch => {
  CommentAPIUtil.deleteComment(id)
    .then(comment => dispatch(receiveOneComment(comment.data)))
    .catch(err => dispatch(receiveCommentErrors(err.response.data)));
};

export const editComment = (id, commentData) => dispatch => {
  CommentAPIUtil.updateComment(id, commentData)
    .then(comment => dispatch(receiveOneComment(comment.data)))
    .catch(err => dispatch(receiveCommentErrors(err.response.data)));
};
