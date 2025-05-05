import {fetchData} from './fetchData.js';

const getReviews = async () => {
  try {
    const response = await fetchData('api/v1/restaurant-reviews');
    return response;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

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
