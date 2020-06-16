import React, { Component } from "react";
import CommentsIndexItem from "./comments_index_item";

export default class CommentsIndex extends Component {
  render() {
    const {
      stateComments,
      resourceComments,
      indentLevel,
      parentCommentId,
      likeComment,
      resourceType,
      resourceId,
      currentUser,
    } = this.props;
    const indexComments = Object.values(stateComments).filter(
      comment =>
        comment.resourceId === resourceId &&
        comment.parentCommentId === parentCommentId
    );
    const borderColor = () => {
      switch (indentLevel % 4) {
        case 0:
          return "olivedrab";
        case 1:
          return "royalblue";
        case 2:
          return "salmon";
        case 3:
          return "rebeccapurple";
      }
    };
    const borderStyle = {
      borderColor: borderColor(),
    };
    return (
      <ul
        className={"comments-index indent-" + indentLevel}
        style={borderStyle}
      >
        {indexComments.length > 0 &&
          indexComments
            .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
            .map(eComment => {
              const itemComment = stateComments[eComment._id];
              return (
                itemComment && (
                  <CommentsIndexItem
                    key={itemComment._id}
                    comment={itemComment}
                    resourceComments={resourceComments}
                    indentLevel={indentLevel + 1}
                    resourceId={resourceId}
                    resourceType={resourceType}
                    likeComment={likeComment}
                    currentUser={currentUser}
                  />
                )
              );
            })}
      </ul>
    );
  }
}
