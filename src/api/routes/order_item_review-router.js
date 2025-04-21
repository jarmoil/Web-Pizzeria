import express from 'express';
import {
  postOrderItemReview,
  fetchOrderItemReviews,
  deleteOrderItemReviewController,
} from '../controllers/order_item_review-controller.js';

import {authenticateToken} from '../middleware/auth-middleware.js';

const reviewRouter = express.Router();

reviewRouter
  .route('/')
  .get(fetchOrderItemReviews)
  .post(authenticateToken, postOrderItemReview);

reviewRouter
  .route('/:id')
  .get()
  .delete(authenticateToken, deleteOrderItemReviewController);

export default reviewRouter;
