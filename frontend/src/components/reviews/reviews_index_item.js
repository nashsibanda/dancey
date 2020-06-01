import React, { Component } from "react";
import { Link } from "react-router-dom";
import CommentsIndexContainer from "../comments/comments_index_container";
import ReactStars from "react-rating-stars-component";

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
    const { showComments } = this.state;
    const { rating, body, username, userId, comments, _id } = review;
    const createdAt = new Date(review.createdAt);
    const updatedAt = new Date(review.updatedAt);
    return (
      <li className="reviews-index-item">
        <div className="review-details">
          <span className="review-attribution">
            Reviewed by <Link to={`/users/${userId}`}>{username}</Link>
          </span>
          <span
            className="review-created-on"
            title={
              review.createdAt === review.updatedAt
                ? `posted at ${createdAt.toString()}`
                : `edited at ${updatedAt.toString()}`
            }
          >
            on {createdAt.toDateString()}
          </span>
          <div className="review-interactions">
            <span className="review-add-comment">
              <button className="link-button">Add Comment</button>
            </span>
            <span className="review-like">
              <button className="link-button">Like</button>
            </span>
          </div>
        </div>
        <div>{body}</div>
        <div>
          <span>Rating:</span>
          <ReactStars value={rating} size={18} edit={false} />
        </div>
        <div>
          {comments.length > 0 ? (
            showComments ? (
              <button className="link-button" onClick={this.toggleComments}>
                Hide Comment{comments.length === 1 ? "" : "s"}
              </button>
            ) : (
              <button className="link-button" onClick={this.toggleComments}>
                Show {comments.length} Comment{comments.length === 1 ? "" : "s"}
              </button>
            )
          ) : (
            <button className="link-button">Add Comment</button>
          )}
        </div>
        <div>
          {showComments && (
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
