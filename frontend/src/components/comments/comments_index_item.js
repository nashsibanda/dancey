import React from "react";
import CommentsIndexContainer from "./comments_index_container";
import { Link } from "react-router-dom";

export default function CommentsIndexItem(props) {
  const {
    comment,
    entityComments,
    indentLevel,
    resourceType,
    resourceId,
  } = props;
  const { body, username, userId } = comment;
  const createdAt = new Date(comment.createdAt);
  const updatedAt = new Date(comment.updatedAt);
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
              ? `posted at ${createdAt.toString()}`
              : `edited at ${updatedAt.toString()}`
          }
        >
          Posted on {createdAt.toDateString()}
        </span>
        <span className="comment-reply">Reply</span>
        <span className="comment-like">Like</span>
      </div>

      <CommentsIndexContainer
        entityComments={entityComments}
        indentLevel={indentLevel}
        parentCommentId={comment._id}
        resourceId={resourceId}
        resourceType={resourceType}
      />
    </li>
  );
}
