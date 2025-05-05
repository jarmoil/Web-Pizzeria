import {useState, useEffect, useCallback} from 'react';
import {getReviews, postReviewService} from '../services/orderItemService';
import calculateAverageRating from '../utils/calculateAverageRatings';

const useOrderItemReviews = (pizzaId) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
