import React, { Component } from "react";
import CommentsIndexContainer from "./comments_index_container";
import { Link } from "react-router-dom";
import moment from "moment";
import CommentFormContainer from "./comment_form_container";

export default class CommentsIndexItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showCommentForm: false,
    };
    this.toggleCommentForm = this.toggleCommentForm.bind(this);
  }

  toggleCommentForm() {
    this.setState({ showCommentForm: !this.state.showCommentForm });
  }

  render() {
    const {
      comment,
      resourceComments,
      indentLevel,
      resourceType,
      resourceId,
    } = this.props;
    const { body, username, userId, createdAt, updatedAt } = comment;
    const { showCommentForm } = this.state;

    return (
      <li className="comment">
        <div className="comment-body">{body}</div>
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
          <span className="comment-reply">
            <button className="link-button" onClick={this.toggleCommentForm}>
              {showCommentForm ? "Cancel" : "Reply"}
            </button>
          </span>
          <span className="comment-like">
            <button className="link-button">Like</button>
          </span>
        </div>
        {showCommentForm && (
          <CommentFormContainer
            resourceType={resourceType}
            resourceId={resourceId}
            parentCommentId={comment._id}
            hideCommentForm={this.toggleCommentForm}
          />
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
