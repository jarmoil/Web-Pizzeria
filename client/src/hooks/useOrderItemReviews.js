import {useState, useEffect} from 'react';
import {getReviews} from '../services/orderItemService';
import calculateAverageRating from '../utils/calculateAverageRatings';

const useOrderItemReviews = (pizzaId) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsData = await getReviews(pizzaId);

        if (reviewsData.length === 0) {
          setReviews([]);
          setAverageRating(0);
        } else {
          setReviews(reviewsData);
          const rating = calculateAverageRating(reviewsData);
          setAverageRating(rating);
          setReviewsCount(reviewsData.length);
        }
      } catch (error) {
        console.log(error);
        setError('Failed to load reviews.');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [pizzaId]);

  return {
    reviews,
    averageRating,
    reviewsCount,
    loading,
    error,
  };
};
export default useOrderItemReviews;
