import {fetchData} from './fetchData.js';

/**
 * Fetches all restaurant reviews.
 *
 * @returns {Promise<Object[]>} A promise that resolves to an array of restaurant review objects.
 * @throws {Error} If the request fails.
 */
const getReviews = async () => {
  try {
    const response = await fetchData('api/v1/restaurant-reviews');
    return response;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

/**
 * Posts a new review for the restaurant.
 *
 * @param {Object} params - The parameters for the review.
 * @param {string} params.comment - The comment for the review.
 * @param {number} params.rating - The rating given to the restaurant (1-5).
 * @param {string} params.token - The authentication token for the request.
 * @returns {Promise<Object>} A promise that resolves to the response data.
 * @throws {Error} If the request fails or if the rating is invalid.
 */
const postReviewService = async ({comment, rating, token}) => {
  if (!rating || rating < 1 || rating > 5) {
    throw new Error('Rating must be between 1 and 5');
  }

  try {
    const response = await fetchData('api/v1/restaurant-reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({comment, rating}),
    });
    return response;
  } catch (error) {
    console.error('Error posting review:', error);
    throw error;
  }
};

/**
 * Deletes a specific restaurant review.
 *
 * @param {number} reviewId - The ID of the review to delete.
 * @param {string} token - The authentication token for the request.
 * @returns {Promise<Object>} A promise that resolves to the response data.
 * @throws {Error} If the request fails.
 */
const deleteRestaurantReview = async (reviewId, token) => {
  try {
    const response = await fetchData(`api/v1/restaurant-reviews/${reviewId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error('Error deleting restaurant review:', error);
    throw error;
  }
};

export {getReviews, postReviewService, deleteRestaurantReview};
