import React, { Component } from "react";
import CommentsIndexContainer from "./comments_index_container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class CommentsSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialLoad: false,
    };
  }

  componentDidMount() {
    const { fetchResourceComments, resourceId, resourceType } = this.props;
    fetchResourceComments(resourceType, resourceId);
    console.log("FETCHING");
    this.setState({ initialLoad: true });
  }

  render() {
    const {
      resourceComments,
      resourceId,
      resourceType,
      loggedIn,
      hideHeader,
      loading,
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
        {this.state.initialLoad && !loading && (
          <CommentsIndexContainer
            resourceComments={resourceComments}
            indentLevel={0}
            resourceId={resourceId}
            resourceType={resourceType}
            parentCommentId={null}
          />
        )}
      </div>
    );
  }
}
