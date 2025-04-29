import React from 'react';
import useOrderItemReviews from '../hooks/useOrderItemReviews';
import OrderItemReviewSection from './OrderItemReviewSection';
import PostReviewForm from './PostReviewForm';

const ReviewModal = ({pizzaId, onClose}) => {
  const {reviews, averageRating, loading, error, postReview} =
    useOrderItemReviews(pizzaId);

  return (
    <div className="reviews-modal">
      <div className="reviews-modal-content">
        <button className="reviews-modal-close" onClick={onClose}>
          ×
        </button>
        <h2>Arvostelut: Pizza {pizzaId}</h2>

        <OrderItemReviewSection
          reviews={reviews}
          averageRating={averageRating}
          loading={loading}
          error={error}
        />

        <PostReviewForm postReview={postReview} />
      </div>
    </div>
  );
};

export default ReviewModal;
