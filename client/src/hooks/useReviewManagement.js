import {useState, useEffect, useCallback} from 'react';
import {
  getReviews as getAllRestaurantReviews,
  deleteRestaurantReview,
} from '../services/restaurantReviewService';
import {
  getAllItemReviews,
  deleteItemReview,
} from '../services/orderItemService';

/**
 * Custom hook for managing reviews in the application.
 * Fetches item and restaurant reviews, allows deletion of reviews, and provides loading and error states.
 *
 * @param {string} token - The authentication token for API requests.
 * @returns {Object} An object containing:
 * - `itemReviews` {Object[]}: An array of item review objects.
 *   - `review_id` {number}: The unique ID of the review.
 *   - `rating` {number}: The rating given by the reviewer (1-5).
 *   - `comment` {string}: The comment provided by the reviewer.
 *   - `reviewer_name` {string}: The name of the reviewer.
 *   - `created_at` {string}: The date when the review was created.
 * - `restaurantReviews` {Object[]}: An array of restaurant review objects.
 *   - `review_id` {number}: The unique ID of the review.
 *   - `rating` {number}: The rating given by the reviewer (1-5).
 *   - `comment` {string}: The comment provided by the reviewer.
 *   - `reviewer_name` {string}: The name of the reviewer.
 *   - `created_at` {string}: The date when the review was created.
 * - `loading` {boolean}: Indicates whether the reviews are being loaded.
 * - `error` {string|null}: Error message if fetching or deleting reviews fails.
 * - `deleteItemReview` {Function}: Function to delete an item review.
 * - `deleteRestaurantReview` {Function}: Function to delete a restaurant review.
 */
const useReviewManagement = (token) => {
  const [itemReviews, setItemReviews] = useState([]);
  const [restaurantReviews, setRestaurantReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetches all item and restaurant reviews from the server.
   * Updates the `itemReviews` and `restaurantReviews` states with the fetched data.
   *
   * @async
   * @returns {Promise<void>}
   */
  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const [itemData, restaurantData] = await Promise.all([
        getAllItemReviews(token),
        getAllRestaurantReviews(),
      ]);
      setItemReviews(itemData);
      setRestaurantReviews(restaurantData);
      setError(null);
    } catch {
      setError('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  }, [token]);

  /**
   * Deletes an item review by its ID.
   * Refreshes the reviews after successful deletion.
   *
   * @async
   * @param {number} reviewId - The ID of the item review to delete.
   * @returns {Promise<void>}
   */
  const handleDeleteItemReview = async (reviewId) => {
    try {
      await deleteItemReview(reviewId, token);
      await fetchReviews();
    } catch {
      setError('Failed to delete item review');
    }
  };

  /**
   * Deletes a restaurant review by its ID.
   * Refreshes the reviews after successful deletion.
   *
   * @async
   * @param {number} reviewId - The ID of the restaurant review to delete.
   * @returns {Promise<void>}
   */
  const handleDeleteRestaurantReview = async (reviewId) => {
    try {
      await deleteRestaurantReview(reviewId, token);
      await fetchReviews();
    } catch {
      setError('Failed to delete restaurant review');
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return {
    itemReviews,
    restaurantReviews,
    loading,
    error,
    deleteItemReview: handleDeleteItemReview,
    deleteRestaurantReview: handleDeleteRestaurantReview,
  };
};

export default useReviewManagement;
