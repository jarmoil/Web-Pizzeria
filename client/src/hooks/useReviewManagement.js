import {useState, useEffect, useCallback} from 'react';
import {getReviews as getAllRestaurantReviews} from '../services/restaurantReviewService';
import {deleteRestaurantReview} from '../services/restaurantReviewService';
import {
  getAllItemReviews,
  deleteItemReview,
} from '../services/orderItemService';

const useReviewManagement = (token) => {
  const [itemReviews, setItemReviews] = useState([]);
  const [restaurantReviews, setRestaurantReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true);
      const [itemData, restaurantData] = await Promise.all([
        getAllItemReviews(token),
        getAllRestaurantReviews(),
      ]);
      setItemReviews(itemData);
      setRestaurantReviews(restaurantData);
      setError(null);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  }, [token]);

  const handleDeleteItemReview = async (reviewId) => {
    try {
      await deleteItemReview(reviewId, token);
      await fetchReviews();
    } catch (err) {
      console.error('Failed to delete item review:', err);
      throw err;
    }
  };

  const handleDeleteRestaurantReview = async (reviewId) => {
    try {
      await deleteRestaurantReview(reviewId, token);
      await fetchReviews();
    } catch (err) {
      console.error('Failed to delete restaurant review:', err);
      throw err;
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
