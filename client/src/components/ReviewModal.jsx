import React from 'react';
import useOrderItemReviews from '../hooks/useOrderItemReviews';
import OrderItemReviewSection from './sections/OrderItemReviewSection';
import PostReviewForm from './menu/PostReviewForm';
import ReactDOM from 'react-dom';

/**
 * ReviewModal component for displaying a modal with pizza reviews and a form to post a new review.
 * Fetches reviews for a specific pizza and allows users to submit their own reviews.
 *
 * @param {Object} props - Component props.
 * @param {number} props.pizzaId - The ID of the pizza for which reviews are displayed.
 * @param {Function} props.onClose - Function to close the modal.
 * @returns {JSX.Element} The review modal with reviews and a review submission form.
 */
const ReviewModal = ({pizzaId, onClose}) => {
  const {reviews, averageRating, loading, error, postReview} =
    useOrderItemReviews(pizzaId);

  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>

        <OrderItemReviewSection
          reviews={reviews}
          averageRating={averageRating}
          loading={loading}
          error={error}
        />

        <PostReviewForm postReview={postReview} />
      </div>
    </div>,
    document.body // Render the modal directly under <body>
  );
};

export default ReviewModal;
