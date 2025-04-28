import React from 'react';
import useOrderItemReviews from '../hooks/useOrderItemReviews'; // Assuming the hook is in this path
import OrderItemReviewSection from './OrderItemReviewSection';

const ReviewModal = ({pizzaId, onClose}) => {
  const {reviews, averageRating, loading, error} = useOrderItemReviews(pizzaId); // Fetch reviews for the specific pizza

  return (
    <div className="reviews-modal">
      <div className="reviews-modal-content">
        <button className="reviews-modal-close" onClick={onClose}>
          ×
        </button>
        <h2>Arvostelut: Pizza {pizzaId}</h2>

        {/* Pass reviews to the section */}
        <OrderItemReviewSection
          reviews={reviews}
          averageRating={averageRating}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
};

export default ReviewModal;
