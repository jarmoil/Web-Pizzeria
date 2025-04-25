import {
  createOrderItemReview,
  getOrderItemReviews,
  deleteOrderItemReview,
  findOrderItemReviewById,
} from '../models/order_item_review-model.js';

export const postOrderItemReview = async (req, res, next) => {
  const user_id = req.user.user_id; // from token
  const {order_item_id, rating, comment} = req.body;

  try {
    const review = await createOrderItemReview({
      user_id,
      order_item_id,
      rating,
      comment,
    });
    res.status(201).json(review);
  } catch (err) {
    next(err);
  }
};

export const fetchOrderItemReviews = async (req, res, next) => {
  try {
    const reviews = await getOrderItemReviews();
    res.json(reviews);
  } catch (err) {
    next(err);
  }
};

export const deleteOrderItemReviewController = async (req, res, next) => {
  const reviewId = parseInt(req.params.id);
  const loggedInUserId = req.user.user_id;
  const userRole = req.user.role;
  try {
    const review = await findOrderItemReviewById(reviewId);
    if (!review) {
      const error = new Error('Review not found');
      error.status = 404;
      return next(error);
    }

    if (review.user_id !== loggedInUserId && userRole !== 'admin') {
      const error = new Error('Not authorized to delete this review');
      error.status = 403;
      return next(error);
    }

    await deleteOrderItemReview(reviewId);
    res.json({message: 'Review deleted successfully'});
  } catch (err) {
    next(err);
  }
};
