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

      if (reviewsData.length === 0) {
        setReviews([]);
        setAverageRating(0);
        setReviewsCount(0);
      } else {
        setReviews(reviewsData);
        const rating = calculateAverageRating(reviewsData);
        setAverageRating(rating);
        setReviewsCount(reviewsData.length);
      }
    } catch (err) {
      console.log(err);
      setError('Failed to load reviews.');
    } finally {
      setLoading(false);
    }
  }, [pizzaId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const postReview = async ({rating, comment, token}) => {
    try {
      await postReviewService({pizzaId, rating, comment, token});
      await fetchReviews();
    } catch (error) {
      console.error('Failed to post review:', error);
      throw error;
    }
  };

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
