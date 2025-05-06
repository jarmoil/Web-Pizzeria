import {useAuth} from '../../hooks/useAuth';
import useReviewManagement from '../../hooks/useReviewManagement';

/**
 * ReviewManagement component for managing customer reviews.
 * Displays menu item reviews and restaurant reviews, and allows deleting reviews.
 *
 * @returns {JSX.Element} The review management interface.
 */
const ReviewManagement = () => {
  const {user} = useAuth();
  const {
    itemReviews,
    restaurantReviews,
    loading,
    error,
    deleteItemReview,
    deleteRestaurantReview,
  } = useReviewManagement(user?.token);

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div>Error: {error}</div>;

  /**
   * Handles the deletion of a menu item review.
   *
   * @param {number} reviewId - The ID of the menu item review to delete.
   * @returns {Promise<void>}
   */
  const handleDeleteItemReview = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await deleteItemReview(reviewId);
      } catch (err) {
        console.error('Failed to delete review:', err);
      }
    }
  };

  /**
   * Handles the deletion of a restaurant review.
   *
   * @param {number} reviewId - The ID of the restaurant review to delete.
   * @returns {Promise<void>}
   */
  const handleDeleteRestaurantReview = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await deleteRestaurantReview(reviewId);
      } catch (err) {
        console.error('Failed to delete review:', err);
      }
    }
  };

  return (
    <section id="review-management" className="managementPage-section">
      <h2 className="managementPage-section-title">Review Management</h2>

      <div className="review-sections">
        {/* Menu Item Reviews */}
        <div className="menu-item-reviews">
          <h3>Menu Item Reviews</h3>
          <div className="review-list">
            {itemReviews.map((review) => (
              <div key={review.item_review_id} className="review-card">
                <div className="review-header">
                  <span className="review-rating">
                    Rating: {review.rating}★
                  </span>
                  <span className="review-date">
                    {new Date(review.created_at).toLocaleDateString()}
                  </span>
                </div>
                <h4 className="review-pizza-name">
                  Pizza: {review.pizza_name}
                </h4>
                <p className="review-comment">{review.comment}</p>
                <span className="review-author">
                  By: {review.reviewer_name}
                </span>
                <div className="review-footer">
                  <button
                    onClick={() =>
                      handleDeleteItemReview(review.item_review_id)
                    }
                    className="delete-review-btn"
                  >
                    Delete Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Restaurant Reviews */}
        <div className="restaurant-reviews">
          <h3>Restaurant Reviews</h3>
          <div className="review-list">
            {restaurantReviews.map((review) => (
              <div key={review.restaurant_review_id} className="review-card">
                <div className="review-header">
                  <span className="review-rating">
                    Rating: {review.rating}★
                  </span>
                  <span className="review-date">
                    {new Date(review.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="review-comment">{review.comment}</p>
                <span className="homepage-rating-user">
                  - {review.username}
                </span>
                <div className="review-footer">
                  <button
                    onClick={() =>
                      handleDeleteRestaurantReview(review.restaurant_review_id)
                    }
                    className="delete-review-btn"
                  >
                    Delete Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewManagement;
