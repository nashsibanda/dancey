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
  return (
    <li className="comment">
      <div>{comment.body}</div>
      <div>
        Posted by <Link to={`/user/${comment.userId}`}>{comment.username}</Link>
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
