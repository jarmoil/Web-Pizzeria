import {useState, useEffect, useCallback} from 'react';
import {getReviews, postReviewService} from '../services/orderItemService';
import calculateAverageRating from '../utils/calculateAverageRatings';

/**
 * Custom hook for managing reviews of a specific pizza.
 * Fetches reviews, calculates the average rating, and allows posting new reviews.
 *
 * @param {number} pizzaId - The ID of the pizza for which reviews are managed.
 * @returns {Object} An object containing:
 * - `reviews` {Object[]}: An array of review objects.
 *   - `item_review_id` {number}: The unique ID of the review.
 *   - `rating` {number}: The rating given by the reviewer (1-5).
 *   - `comment` {string}: The comment provided by the reviewer.
 *   - `reviewer_name` {string}: The name of the reviewer.
 *   - `created_at` {string}: The date when the review was created.
 * - `averageRating` {number}: The average rating of the pizza.
 * - `reviewsCount` {number}: The total number of reviews.
 * - `loading` {boolean}: Indicates whether the reviews are being loaded.
 * - `error` {string|null}: Error message if fetching or posting reviews fails.
 * - `postReview` {Function}: Function to post a new review.
 */
const useOrderItemReviews = (pizzaId) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetches reviews for the specified pizza.
   * Updates the reviews, average rating, and reviews count.
   *
   * @async
   * @returns {Promise<void>}
   */
  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const reviewsData = await getReviews(pizzaId);
      setReviews(reviewsData);
      setAverageRating(
        reviewsData.length ? calculateAverageRating(reviewsData) : 0
      );
      setReviewsCount(reviewsData.length);
      setError(null);
    } catch {
      setError('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  }, [pizzaId]);

  /**
   * Posts a new review for the specified pizza.
   * Refreshes the reviews after successfully posting.
   *
   * @async
   * @param {Object} reviewData - The data for the new review.
   * @param {number} reviewData.rating - The rating given by the reviewer (1-5).
   * @param {string} reviewData.comment - The comment provided by the reviewer.
   * @param {string} reviewData.token - The authentication token for the request.
   * @returns {Promise<void>}
   */
  const postReview = async ({rating, comment, token}) => {
    try {
      await postReviewService({pizzaId, rating, comment, token});
      await fetchReviews();
    } catch {
      setError('Failed to post review');
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return {
    reviews,
    averageRating,
    reviewsCount,
    loading,
    error,
    postReview,
  };
};

export default useOrderItemReviews;
