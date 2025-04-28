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

export {getReviews};
