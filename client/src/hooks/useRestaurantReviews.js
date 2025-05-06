import {useState, useEffect, useCallback} from 'react';
import {
  getReviews,
  postReviewService,
} from '../services/restaurantReviewService';

/**
 * Custom hook for managing restaurant reviews.
 * Fetches reviews, allows posting new reviews, and provides loading and error states.
 *
 * @returns {Object} An object containing:
 * - `reviews` {Object[]}: An array of review objects.
 *   - `review_id` {number}: The unique ID of the review.
 *   - `rating` {number}: The rating given by the reviewer (1-5).
 *   - `comment` {string}: The comment provided by the reviewer.
 *   - `reviewer_name` {string}: The name of the reviewer.
 *   - `created_at` {string}: The date when the review was created.
 * - `loading` {boolean}: Indicates whether the reviews are being loaded.
 * - `error` {string|null}: Error message if fetching or posting reviews fails.
 * - `postReview` {Function}: Function to post a new review.
 */
const useRestaurantReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetches all restaurant reviews from the server.
   * Updates the `reviews` state with the fetched data.
   *
   * @async
   * @returns {Promise<void>}
   */
  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const reviewsData = await getReviews();
      setReviews(reviewsData);
      setError(null);
    } catch {
      setError('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Posts a new review for the restaurant.
   * Refreshes the reviews after successfully posting.
   *
   * @async
   * @param {Object} reviewData - The data for the new review.
   * @param {string} reviewData.comment - The comment provided by the reviewer.
   * @param {number} reviewData.rating - The rating given by the reviewer (1-5).
   * @param {string} reviewData.token - The authentication token for the request.
   * @returns {Promise<void>}
   */
  const postReview = async ({comment, rating, token}) => {
    try {
      await postReviewService({comment, rating, token});
      await fetchReviews();
    } catch {
      setError('Failed to post review');
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return {reviews, loading, error, postReview};
};

export default useRestaurantReviews;
