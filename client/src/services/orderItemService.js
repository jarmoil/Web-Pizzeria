import {fetchData} from './fetchData.js';

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
