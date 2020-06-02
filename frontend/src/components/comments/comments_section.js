import React, { Component } from "react";
import CommentsIndexContainer from "./comments_index_container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
            {loggedIn && (
              <button className="big-button">
                <FontAwesomeIcon icon={"comment"} />
                <span>Add a Comment</span>
              </button>
            )}
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
