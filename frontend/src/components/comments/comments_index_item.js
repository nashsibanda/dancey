import React from "react";
import CommentsIndexContainer from "./comments_index_container";
import { Link } from "react-router-dom";
import moment from "moment";

export default function CommentsIndexItem(props) {
  const {
    comment,
    entityComments,
    indentLevel,
    resourceType,
    resourceId,
  } = props;
  const { body, username, userId, createdAt, updatedAt } = comment;
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
          <button className="link-button">Reply</button>
        </span>
        <span className="comment-like">
          <button className="link-button">Like</button>
        </span>
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
