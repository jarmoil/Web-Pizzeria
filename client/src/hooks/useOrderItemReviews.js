import {useState, useEffect} from 'react';
import {getReviews} from '../services/orderItemService'; // Import the getReviews function from your service

const useOrderItemReviews = (pizzaId) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsData = await getReviews(pizzaId);

        if (reviewsData.length === 0) {
          setReviews([]); // Handle the empty reviews case
          setAverageRating(0); // No reviews, no rating
        } else {
          setReviews(reviewsData);
          const avgRating =
            reviewsData.reduce((sum, review) => sum + review.rating, 0) /
            reviewsData.length;
          setAverageRating(avgRating);
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
    loading,
    error,
  };
};
export default useOrderItemReviews;
