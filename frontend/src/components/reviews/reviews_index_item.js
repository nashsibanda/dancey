import React, { Component } from "react";
import { Link } from "react-router-dom";
import CommentsIndexContainer from "../comments/comments_index_container";

export default class ReviewsIndexItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showComments: false,
      commentsFetched: false,
    };
    this.toggleComments = this.toggleComments.bind(this);
  }

  toggleComments(e) {
    e.preventDefault();
    const { fetchOneReview, review } = this.props;
    if (!this.state.commentsFetched) {
      fetchOneReview(review._id);
    }
    this.setState({
      showComments: !this.state.showComments,
      commentsFetched: true,
    });
  }

  render() {
    const { review } = this.props;
    const { rating, body, username, userId, comments, _id } = review;
    return (
      <li className="reviews-index-item">
        <div>{body}</div>
        <div>Rating: {rating}</div>
        <div>
          Reviewed by <Link to={`/users/${userId}`}>{username}</Link>
        </div>
        {comments.length > 0 && (
          <div>
            <button className="big-button" onClick={this.toggleComments}>
              Show {comments.length} Comment{comments.length === 1 ? "" : "s"}
            </button>
          </div>
        )}
        <div>
          {this.state.showComments && (
            <CommentsIndexContainer
              entityComments={comments}
              indentLevel={0}
              resourceId={_id}
              parentCommentId={null}
              resourceType={"review"}
            />
          )}
        </div>
      </li>
    );
  }
}
