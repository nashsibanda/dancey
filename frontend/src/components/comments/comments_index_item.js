import React, { Component } from "react";
import CommentsIndexContainer from "./comments_index_container";
import { Link } from "react-router-dom";
import moment from "moment";
import NewCommentFormContainer from "./new_comment_form_container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditCommentFormContainer from "./edit_comment_form_container";

export default class CommentsIndexItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showReplyForm: false,
      deleting: false,
      showEditForm: false,
      showChildComments: true,
    };
    this.toggleReplyForm = this.toggleReplyForm.bind(this);
    this.toggleEditForm = this.toggleEditForm.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  toggleReplyForm() {
    this.setState({ showReplyForm: !this.state.showReplyForm });
  }

  toggleEditForm() {
    this.setState({ showEditForm: !this.state.showEditForm });
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
    const {
      showReplyForm,
      deleting,
      showEditForm,
      showChildComments,
    } = this.state;

    const liked =
      currentUser && likes ? (likes[currentUser.id] ? true : false) : false;

    return (
      <li className="comment">
        {!deleted ? (
          <div className="comment-details">
            <span className="comment-attribution">
              <Link to={`/user/${userId}`}>{username}</Link>
            </span>
            <span
              className="comment-created-on"
              title={
                comment.createdAt === comment.updatedAt
                  ? `posted at ${moment(createdAt).format("LLL")}`
                  : `edited at ${moment(updatedAt).format("LLL")}`
              }
            >
              {moment(createdAt).format("LLL")}
              {comment.createdAt === comment.updatedAt ? (
                ""
              ) : (
                <span className="edited-indicator">
                  *<span className="indicator-text">edited</span>
                </span>
              )}
            </span>
          </div>
        ) : (
          <div className="comment-details deleted">
            <span>[This comment has been deleted]</span>
          </div>
        )}
        {!deleted && (
          <>
            {showEditForm ? (
              <EditCommentFormContainer
                comment={comment}
                hideCommentForm={this.toggleEditForm}
              />
            ) : (
              <div className="comment-body">{body}</div>
            )}
            <div className="comment-interactions">
              <span className="comment-reply">
                <button className="link-button" onClick={this.toggleReplyForm}>
                  {showReplyForm ? "Cancel" : "Reply"}
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
              {currentUser &&
                (currentUser.id === userId || currentUser.isAdmin) && (
                  <>
                    <span className="comment-delete">
                      <button
                        className="link-button"
                        onClick={this.handleDelete}
                      >
                        {deleting ? "Deleting..." : "Delete"}
                      </button>
                    </span>
                    <span className="comment-edit">
                      <button
                        className="link-button"
                        onClick={this.toggleEditForm}
                      >
                        {showEditForm ? "Cancel" : "Edit"}
                      </button>
                    </span>
                  </>
                )}
            </div>
            {showReplyForm && (
              <NewCommentFormContainer
                resourceType={resourceType}
                resourceId={resourceId}
                parentCommentId={comment._id}
                hideCommentForm={this.toggleReplyForm}
              />
            )}
          </>
        )}

        {showChildComments && (
          <CommentsIndexContainer
            resourceComments={resourceComments}
            indentLevel={indentLevel}
            parentCommentId={comment._id}
            resourceId={resourceId}
            resourceType={resourceType}
          />
        )}
      </li>
    );
  }
}
