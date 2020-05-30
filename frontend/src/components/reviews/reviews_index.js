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
      <div>Average Rating: {Math.round(avgRating * 10) / 10}</div>
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
