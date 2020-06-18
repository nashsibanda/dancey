import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import moment from "moment";
import CommentsSectionContainer from "../comments/comments_section_container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditReviewFormContainer from "./edit_review_form_container";

export default class ReviewsIndexItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      commentsFetched: false,
      deleting: false,
      showEditForm: false,
    };
    this.handleLike = this.handleLike.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.toggleEditForm = this.toggleEditForm.bind(this);
  }

  componentDidMount() {
    const { _id, comments } = this.props.review;
    if (comments.length > 0) this.props.fetchResourceComments("review", _id);
    this.setState({ commentsFetched: true });
  }

  toggleEditForm() {
    this.setState({ showEditForm: !this.state.showEditForm });
  }

  handleLike() {
    const { review, likeReview } = this.props;
    likeReview(review._id);
  }

  handleDelete() {
    const { review, deleteReview } = this.props;
    deleteReview(review._id);
    this.setState({ deleting: true });
  }

  render() {
    const { review, currentUser } = this.props;
    const {
      rating,
      body,
      username,
      userId,
      comments,
      _id,
      createdAt,
      updatedAt,
      likes,
    } = review;
    const { deleting, showEditForm } = this.state;

    const liked =
      currentUser && likes ? (likes[currentUser.id] ? true : false) : false;

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
            {createdAt === updatedAt ? (
              ""
            ) : (
              <span className="edited-indicator">
                *<span className="indicator-text">edited</span>
              </span>
            )}
          </span>
          <div className="review-interactions">
            <span className="review-add-comment">
              <button className="link-button">Add Comment</button>
            </span>
            <span className="review-like">
              <button
                className={`link-button likes-button ${
                  liked ? "liked" : "unliked"
                }`}
                onClick={this.handleLike}
              >
                <FontAwesomeIcon icon="heart" />
                <span>{likes ? Object.values(likes).length : 0}</span>
              </button>
            </span>
            {currentUser && currentUser.id === userId && (
              <>
                <span className="review-edit">
                  <button className="link-button" onClick={this.toggleEditForm}>
                    {deleting ? "Cancel" : "Edit"}
                  </button>
                </span>
                <span className="review-delete">
                  <button className="link-button" onClick={this.handleDelete}>
                    {deleting ? "Deleting..." : "Delete"}
                  </button>
                </span>
              </>
            )}
          </div>
        </div>
        {showEditForm ? (
          <EditReviewFormContainer
            review={review}
            hideReviewForm={this.toggleEditForm}
          />
        ) : (
          <div className="review-body">{body}</div>
        )}
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
