import React, { Component } from "react";
import { Link } from "react-router-dom";
import CommentsIndexContainer from "../comments/comments_index_container";
import ReactStars from "react-rating-stars-component";
import moment from "moment";
import CommentsSectionContainer from "../comments/comments_section_container";

export default class ReviewsIndexItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      commentsFetched: false,
    };
  }

  componentDidMount() {
    const { _id, comments } = this.props.review;
    if (comments.length > 0) this.props.fetchResourceComments("review", _id);
    this.setState({ commentsFetched: true });
  }

  render() {
    const { review } = this.props;
    const { showComments } = this.state;
    const {
      rating,
      body,
      username,
      userId,
      comments,
      _id,
      createdAt,
      updatedAt,
    } = review;

    return (
      <li className="reviews-index-item">
        <div className="review-details">
          <span className="review-attribution">
            Reviewed by <Link to={`/users/${userId}`}>{username}</Link>
          </span>
          <span
            className="review-created-on"
            title={
              createdAt === updatedAt
                ? `posted at ${moment(createdAt).format("LLL")}`
                : `edited at ${moment(updatedAt).format("LLL")}`
            }
          >
            on {moment(createdAt).format("LL")}
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
          <CommentsSectionContainer
            resourceComments={comments}
            resourceId={_id}
            resourceType={"review"}
            smallCommentsSection
          />
        </div>
      </li>
    );
  }
}
