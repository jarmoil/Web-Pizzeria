import express from 'express';
import {
  getReviews,
  getReview,
  postReview,
  deleteReview
} from '../controllers/restaurant_reviews-controller.js';
import { authenticateToken } from '../middleware/auth-middleware.js';

const router = express.Router();

router.route('/')
  .get(getReviews)
  .post(authenticateToken, postReview); // only logged in users can post

router.route('/:id')
  .get(getReview)
  .delete(authenticateToken, deleteReview); // only author or admin can delete

export default router;
