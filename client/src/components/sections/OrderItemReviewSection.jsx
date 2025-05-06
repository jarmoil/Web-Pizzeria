import React from 'react';

/**
 * OrderItemReviewSection component for displaying reviews of a specific pizza.
 * Shows the average rating, a list of customer reviews, and handles loading and error states.
 *
 * @param {Object} props - Component props.
 * @param {Object[]} props.reviews - Array of reviews for the pizza.
 * @param {number} props.reviews[].item_review_id - Unique ID of the review.
 * @param {number} props.reviews[].rating - Rating given by the reviewer (1-5).
 * @param {string} props.reviews[].comment - Comment provided by the reviewer.
 * @param {string} props.reviews[].reviewer_name - Name of the reviewer.
 * @param {string} props.reviews[].created_at - Date when the review was created.
 * @param {number} props.averageRating - The average rating of the pizza.
 * @param {boolean} props.loading - Indicates if the reviews are being loaded.
 * @param {string|null} props.error - Error message if loading reviews fails.
 * @returns {JSX.Element} The review section for a specific pizza.
 */
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
      <h2 className="customer-reviews-title">Customer Reviews</h2>
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
                <span className="review-author">- {review.reviewer_name}</span>
              </li>
            ))
          ) : (
            <p>No reviews yet for this pizza.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default OrderItemReviewSection;
