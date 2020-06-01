import React, { Component } from "react";
import ReactStars from "react-rating-stars-component";
import ReviewsIndexItem from "./reviews_index_item";

export default class ReviewsIndex extends Component {
  componentDidMount() {
    const { fetchResourceReviews, resourceId, resourceType } = this.props;
    fetchResourceReviews(resourceType, resourceId);
  }

  render() {
    const {
      resourceId,
      resourceType,
      stateReviews,
      fetchOneReview,
      loggedIn,
    } = this.props;

    const indexReviews = Object.values(stateReviews).filter(
      review =>
        review.resourceType === resourceType && review.resourceId === resourceId
    );

    const avgRating =
      (indexReviews.reduce(
        (acc, currentReview) => acc + currentReview.rating,
        0
      ) *
        1.0) /
      indexReviews.length;

    return (
      <div className="reviews-index-container">
        <div className="resource-show-section-header">
          <h2>Reviews</h2>
          {loggedIn && <button className="big-button">Add a Review</button>}
        </div>
        <div className="reviews-average-rating">
          <ReactStars
            value={Math.round(avgRating * 10) / 10}
            size={18}
            half={true}
            edit={false}
            className={"rating-stars"}
          />
          <div>
            Average Rating: {Math.round(avgRating * 10) / 10 || "No Ratings"}
          </div>
        </div>
        <ul className="reviews-index">
          {indexReviews.length > 0 &&
            indexReviews.map(review => {
              return (
                review && (
                  <ReviewsIndexItem
                    review={review}
                    key={review._id}
                    fetchOneReview={fetchOneReview}
                  />
                )
              );
            })}
        </ul>
      </div>
    );
  }
}
