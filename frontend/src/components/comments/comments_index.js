import React, { Component } from "react";
import CommentsIndexItem from "./comments_index_item";

export default class CommentsIndex extends Component {
  render() {
    const {
      stateComments,
      indentLevel,
      parentCommentId,
      entityComments,
      resourceType,
      resourceId,
    } = this.props;
    const indexComments = entityComments.filter(
      comment => comment.parentCommentId === parentCommentId
    );
    return (
      <ul className={"comments-index indent-" + indentLevel}>
        {indexComments.length > 0 &&
          indexComments.map(eComment => {
            const itemComment = stateComments[eComment._id];
            return (
              itemComment && (
                <CommentsIndexItem
                  key={itemComment._id}
                  comment={itemComment}
                  entityComments={entityComments}
                  indentLevel={indentLevel + 1}
                  resourceId={resourceId}
                  resourceType={resourceType}
                />
              )
            );
          })}
      </ul>
    );
  }
}
