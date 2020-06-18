import React, { Component } from "react";
import CommentsIndexContainer from "./comments_index_container";
import { Link } from "react-router-dom";
import moment from "moment";
import CommentFormContainer from "./comment_form_container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class CommentsIndexItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showCommentForm: false,
      deleting: false,
    };
    this.toggleCommentForm = this.toggleCommentForm.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  toggleCommentForm() {
    this.setState({ showCommentForm: !this.state.showCommentForm });
  }

  handleLike() {
    const { likeComment, comment } = this.props;
    likeComment(comment._id);
  }

  handleDelete() {
    const { deleteComment, comment } = this.props;
    deleteComment(comment._id);
    this.setState({ deleting: true });
  }

  render() {
    const {
      comment,
      resourceComments,
      indentLevel,
      resourceType,
      resourceId,
      currentUser,
    } = this.props;
    const {
      body,
      username,
      userId,
      createdAt,
      updatedAt,
      likes,
      deleted,
    } = comment;
    const { showCommentForm, deleting } = this.state;

    const liked =
      currentUser && likes ? (likes[currentUser.id] ? true : false) : false;

    return (
      <li className="comment">
        {!deleted ? (
          <div className="comment-details">
            <span className="comment-attribution">
              Posted by <Link to={`/user/${userId}`}>{username}</Link>
            </span>
            <span
              className="comment-created-on"
              title={
                comment.createdAt === comment.updatedAt
                  ? `posted at ${moment(createdAt).format("LLL")}`
                  : `edited at ${moment(updatedAt).format("LLL")}`
              }
            >
              Posted on {moment(createdAt).format("LLL")}
            </span>
          </div>
        ) : (
          <div className="comment-details deleted">
            <span>Comment deleted...</span>
          </div>
        )}
        {!deleted && (
          <>
            <div className="comment-body">{body}</div>
            <div className="comment-interactions">
              <span className="comment-reply">
                <button
                  className="link-button"
                  onClick={this.toggleCommentForm}
                >
                  {showCommentForm ? "Cancel" : "Reply"}
                </button>
              </span>
              <span className="comment-like">
                <button
                  className={`link-button likes-button ${
                    liked ? "liked" : "unliked"
                  }`}
                  onClick={this.handleLike}
                >
                  <FontAwesomeIcon icon="heart" />
                  <span>{likes ? Object.values(likes).length : 0}</span>
                </button>
              </span>
              {currentUser && currentUser.id === userId && (
                <span className="comment-delete">
                  <button className="link-button" onClick={this.handleDelete}>
                    {deleting ? "Deleting..." : "Delete"}
                  </button>
                </span>
              )}
            </div>
            {showCommentForm && (
              <CommentFormContainer
                resourceType={resourceType}
                resourceId={resourceId}
                parentCommentId={comment._id}
                hideCommentForm={this.toggleCommentForm}
              />
            )}
          </>
        )}

        <CommentsIndexContainer
          resourceComments={resourceComments}
          indentLevel={indentLevel}
          parentCommentId={comment._id}
          resourceId={resourceId}
          resourceType={resourceType}
        />
      </li>
    );
  }
}
