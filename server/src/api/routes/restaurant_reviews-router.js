import express from 'express';
import {
  getReviews,
  getReview,
  postReview,
  deleteReview,
} from '../controllers/restaurant_reviews-controller.js';

import {
  validateCreateReview,
  validateReviewIdParam,
} from '../middleware/validation/restaurantReviews-validator.js';
import {authenticateToken} from '../middleware/auth-middleware.js';

const router = express.Router();

router
  .route('/')
  .get(getReviews)
  .post(authenticateToken, validateCreateReview, postReview); // only logged in users can post

router
  .route('/:id')
  .get(validateReviewIdParam, getReview)
  .delete(authenticateToken, validateReviewIdParam, deleteReview); // only author or admin can delete

export default router;
