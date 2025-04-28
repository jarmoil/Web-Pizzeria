import express from 'express';
import {
  postOrderItemReview,
  fetchOrderItemReviews,
  deleteOrderItemReviewController,
  fetchOrderItemReviewsByPizzaId,
} from '../controllers/order_item_review-controller.js';
import {
  validateCreateOrderItemReview,
  validateOrderItemReviewIdParam,
  validateOrderItemReviewPizzaIdParam,
} from '../middleware/validation/orderItemReview-validator.js';

import {authenticateToken} from '../middleware/auth-middleware.js';

const reviewRouter = express.Router();

reviewRouter
  .route('/')
  .get(fetchOrderItemReviews)
  .post(authenticateToken, validateCreateOrderItemReview, postOrderItemReview);

reviewRouter
  .route('/pizza')
  .get(validateOrderItemReviewPizzaIdParam, fetchOrderItemReviewsByPizzaId);

reviewRouter
  .route('/:id')
  .delete(
    authenticateToken,
    validateOrderItemReviewIdParam,
    deleteOrderItemReviewController
  );

export default reviewRouter;
