import React from 'react';

const OrderItemReviewSection = ({reviews, averageRating, loading, error}) => {
  return (
    <div className="order-item-review-section">
      <div className="order-item-review-header">
        <h2>Reviews for this pizza</h2>
        <p>Average Rating: {averageRating.toFixed(1)} / 5</p>
      </div>

      {loading && <p>Loading reviews...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="order-item-reviews">
        <h3>Customer Reviews</h3>
        <ul className="review-list">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <li key={review.item_review_id} className="review-item">
                <div className="review-header">
                  <span className="review-rating">{review.rating} ★</span>
                  <span className="review-date">
                    {new Date(review.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="review-comment">{review.comment}</p>
              </li>
            ))
          ) : (
            <p>No reviews yet for this pizza.</p> // Display message when no reviews are available
          )}
        </ul>
      </div>
    </div>
  );
};

export default OrderItemReviewSection;
