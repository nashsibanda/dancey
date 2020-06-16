import React, { Component } from "react";
import CommentsIndexContainer from "./comments_index_container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CommentFormContainer from "./comment_form_container";

export default class CommentsSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialLoad: false,
      showComments:
        this.props.smallCommentsSection &&
        this.props.resourceComments.length > 0
          ? false
          : true,
      showCommentForm: false,
    };
    this.toggleComments = this.toggleComments.bind(this);
    this.toggleCommentForm = this.toggleCommentForm.bind(this);
  }

  componentDidMount() {
    const {
      fetchResourceComments,
      resourceId,
      resourceType,
      resourceComments,
    } = this.props;
    if (resourceComments.length > 0)
      fetchResourceComments(resourceType, resourceId);
    this.setState({ initialLoad: true });
  }

  toggleComments() {
    this.setState({ showComments: !this.state.showComments });
  }

  toggleCommentForm() {
    this.setState({ showCommentForm: !this.state.showCommentForm });
  }

  render() {
    const {
      resourceComments,
      resourceId,
      resourceType,
      loggedIn,
      smallCommentsSection,
      loading,
    } = this.props;
    const { initialLoad, showComments, showCommentForm } = this.state;

    return (
      <div>
        {smallCommentsSection ? (
          <div className="small-comments-section-header">
            {resourceComments.length > 0 ? (
              showComments ? (
                <button className="link-button" onClick={this.toggleComments}>
                  Hide Comment{resourceComments.length === 1 ? "" : "s"}
                </button>
              ) : (
                <button className="link-button" onClick={this.toggleComments}>
                  Show {resourceComments.length} Comment
                  {resourceComments.length === 1 ? "" : "s"}
                </button>
              )
            ) : (
              <span className="disabled-void-text">No comments...</span>
            )}

            <button
              className="big-button add-comment-button"
              onClick={this.toggleCommentForm}
            >
              <FontAwesomeIcon icon={"comment"} />
              <span>{showCommentForm ? "Cancel" : "Add a Comment"}</span>
            </button>
          </div>
        ) : (
          <div className="resource-show-section-header">
            <h2>Comments</h2>
            {loggedIn && (
              <button
                className="big-button add-comment-button"
                onClick={this.toggleCommentForm}
              >
                <FontAwesomeIcon icon={"comment"} />
                <span>{showCommentForm ? "Cancel" : "Add a Comment"}</span>
              </button>
            )}
          </div>
        )}
        {showCommentForm && <CommentFormContainer />}
        {initialLoad && !loading && showComments && (
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
