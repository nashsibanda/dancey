import React, { Component } from "react";
import CommentsIndexContainer from "./comments_index_container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NewCommentFormContainer from "./new_comment_form_container";

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
      stateComments,
    } = this.props;
    const { initialLoad, showComments, showCommentForm } = this.state;

    const commentsNumber = Object.values(stateComments).filter(
      comment => comment.resourceId === resourceId
    ).length;

    return (
      <div>
        {smallCommentsSection ? (
          <div className="small-comments-section-header">
            {commentsNumber > 0 ? (
              showComments ? (
                <button className="link-button" onClick={this.toggleComments}>
                  Hide Comment{commentsNumber === 1 ? "" : "s"}
                </button>
              ) : (
                <button className="link-button" onClick={this.toggleComments}>
                  Show {commentsNumber} Comment
                  {commentsNumber === 1 ? "" : "s"}
                </button>
              )
            ) : (
              <span className="disabled-void-text">No comments...</span>
            )}

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
        {showCommentForm && (
          <NewCommentFormContainer
            resourceType={resourceType}
            resourceId={resourceId}
            parentCommentId={null}
            hideCommentForm={this.toggleCommentForm}
          />
        )}
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
