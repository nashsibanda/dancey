import ReactStars from "react-rating-stars-component";
import React from "react";
import ReviewsIndexItem from "./reviews_index_item";

export default function ReviewsIndex(props) {
  const {
    resourceId,
    resourceType,
    entityReviews,
    stateReviews,
    fetchOneReview,
  } = props;

  const avgRating =
    (entityReviews.reduce(
      (acc, currentReview) => acc + currentReview.rating,
      0
    ) *
      1.0) /
    entityReviews.length;

  return (
    <div className="reviews-index-container">
      <div className="reviews-average-rating">
        <ReactStars
          value={Math.round(avgRating * 10) / 10}
          size={18}
          half={true}
          edit={false}
          className={"rating-stars"}
        />
        <div>Average Rating: {Math.round(avgRating * 10) / 10}</div>
      </div>
      <ul className="reviews-index">
        {entityReviews.length > 0 &&
          entityReviews.map(eReview => {
            const itemReview = stateReviews[eReview._id];
            return (
              itemReview && (
                <ReviewsIndexItem
                  review={itemReview}
                  key={itemReview._id}
                  fetchOneReview={fetchOneReview}
                />
              )
            );
          })}
      </ul>
    </div>
  );
}
