import {useState, useEffect, useCallback} from 'react';
import {
  getReviews as getAllRestaurantReviews,
  deleteRestaurantReview,
} from '../services/restaurantReviewService';
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

  const handleDeleteItemReview = async (reviewId) => {
    try {
      await deleteItemReview(reviewId, token);
      await fetchReviews();
    } catch {
      setError('Failed to delete item review');
    }
  };

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
