import {
  createOrderItemReview,
  getOrderItemReviews,
  deleteOrderItemReview,
  findOrderItemReviewById
} from '../models/order_item_review-model.js';

export const postOrderItemReview = async (req, res) => {
  try {
    const user_id = req.user.user_id; // from token
    const { order_item_id, rating, comment } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5.' });
    }

    const review = await createOrderItemReview({ user_id, order_item_id, rating, comment });
    res.status(201).json(review);
  } catch (err) {
    console.error('Error creating review:', err);
    res.status(500).json({ error: 'Server error while submitting review.' });
  }
};

export const fetchOrderItemReviews = async (req, res) => {
  try {
    const reviews = await getOrderItemReviews();
    res.json(reviews);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ error: 'Server error while fetching reviews.' });
  }
};

export const deleteOrderItemReviewController = async (req, res) => {
  try {
    const reviewId = parseInt(req.params.id);
    const loggedInUserId = req.user.user_id;
    const userRole = req.user.role;

    const review = await findOrderItemReviewById(reviewId);
    if (!review) return res.status(404).json({ error: 'Review not found' });

    if (review.user_id !== loggedInUserId && userRole !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to delete this review' });
    }

    await deleteOrderItemReview(reviewId);
    res.json({ message: 'Review deleted successfully' });
  } catch (err) {
    console.error('Error deleting review:', err);
    res.status(500).json({ error: 'Server error while deleting review' });
  }
};
