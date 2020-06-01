import React, { Component } from "react";
import CommentsIndexContainer from "./comments_index_container";

export default class CommentsSection extends Component {
  render() {
    const {
      entityComments,
      resourceId,
      resourceType,
      loggedIn,
      hideHeader,
    } = this.props;
    return (
      <div>
        {!hideHeader && (
          <div className="resource-show-section-header">
            <h2>Comments</h2>
            {loggedIn && <button className="big-button">Add a Comment</button>}
          </div>
        )}
        <CommentsIndexContainer
          entityComments={entityComments}
          indentLevel={0}
          resourceId={resourceId}
          resourceType={resourceType}
          parentCommentId={null}
        />
      </div>
    );
  }
}
