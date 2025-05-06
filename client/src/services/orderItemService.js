import {fetchData} from './fetchData.js';

/**
 * Fetches reviews for a specific pizza.
 *
 * @param {number} pizzaId - The ID of the pizza to fetch reviews for.
 * @returns {Promise<Object[]>} A promise that resolves to an array of review objects.
 * @throws {Error} If the request fails.
 */
const getReviews = async (pizzaId) => {
  try {
    const response = await fetchData(
      `api/v1/order-item-reviews/pizza?pizza_id=${pizzaId}`
    );
    return response;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

/**
 * Posts a new review for a specific pizza.
 *
 * @param {Object} params - The parameters for the review.
 * @param {number} params.pizzaId - The ID of the pizza being reviewed.
 * @param {number} params.rating - The rating given to the pizza (1-5).
 * @param {string} params.comment - The comment for the review.
 * @param {string} params.token - The authentication token for the request.
 * @returns {Promise<Object>} A promise that resolves to the response data.
 * @throws {Error} If the request fails.
 */
const postReviewService = async ({pizzaId, rating, comment, token}) => {
  try {
    const response = await fetchData(`api/v1/order-item-reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        order_item_id: pizzaId,
        rating,
        comment,
      }),
    });
    return response;
  } catch (error) {
    console.error('Error posting review:', error);
    throw error;
  }
};

/**
 * Fetches all item reviews.
 *
 * @param {string} token - The authentication token for the request.
 * @returns {Promise<Object[]>} A promise that resolves to an array of all item reviews.
 * @throws {Error} If the request fails.
 */
const getAllItemReviews = async (token) => {
  try {
    const response = await fetchData('api/v1/order-item-reviews', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching all reviews:', error);
    throw error;
  }
};

/**
 * Deletes a specific item review.
 *
 * @param {number} reviewId - The ID of the review to delete.
 * @param {string} token - The authentication token for the request.
 * @returns {Promise<Object>} A promise that resolves to the response data.
 * @throws {Error} If the request fails.
 */
const deleteItemReview = async (reviewId, token) => {
  try {
    const response = await fetchData(`api/v1/order-item-reviews/${reviewId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error('Error deleting item review:', error);
    throw error;
  }
};

export {getReviews, postReviewService, deleteItemReview, getAllItemReviews};
