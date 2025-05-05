import {useState, useEffect, useCallback} from 'react';
import {
  getReviews,
  postReviewService,
} from '../services/restaurantReviewService';

const useRestaurantReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
