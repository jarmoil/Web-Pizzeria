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

/**
 * @api {get} /restaurant-reviews Get all restaurant reviews
 * @apiName GetRestaurantReviews
 * @apiGroup RestaurantReviews
 *
 * @apiSuccess {Object[]} reviews List of restaurant reviews
 * @apiSuccess {Number} reviews.restaurant_review_id Review ID
 * @apiSuccess {Number} reviews.user_id Id of the reviewer
 * @apiSuccess {Number} reviews.rating Rating (1-5)
 * @apiSuccess {String} reviews.comment Review comment
 * @apiSuccess {Date} reviews.created_at Review creation date
 * @apiSuccess {String} reviews.username Name of the reviewer
 */
router
  .route('/')
  .get(getReviews)

  /**
   * @api {post} /restaurant-reviews Create restaurant review
   * @apiName CreateRestaurantReview
   * @apiGroup RestaurantReviews
   *
   * @apiHeader {String} Authorization Bearer token
   *
   * @apiBody {Number} rating Rating between 1-5
   * @apiBody {String} comment Review comment (must match safe regex pattern)
   *
   * @apiSuccess {Object} review Created review
   * @apiSuccess {Number} review.restaurant_review_id Review ID
   * @apiSuccess {Number} review.user_id User ID who created the review
   * @apiSuccess {Number} review.rating Rating given
   * @apiSuccess {String} review.comment Review comment
   *
   * @apiError {Object} 401 Not authenticated
   * @apiError {Object} 400 Validation error
   */
  .post(authenticateToken, validateCreateReview, postReview); // only logged in users can post

/**
 * @api {get} /restaurant-reviews/:id Get review by ID
 * @apiName GetRestaurantReviewById
 * @apiGroup RestaurantReviews
 *
 * @apiParam {Number} id Review ID
 *
 * @apiSuccess {Object} review Review details
 * @apiError {Object} 404 Review not found
 */
router
  .route('/:id')
  .get(validateReviewIdParam, getReview)

  /**
   * @api {delete} /restaurant-reviews/:id Delete review
   * @apiName DeleteRestaurantReview
   * @apiGroup RestaurantReviews
   *
   * @apiHeader {String} Authorization Bearer token
   * @apiParam {Number} id Review ID to delete
   *
   * @apiSuccess {Object} result
   * @apiSuccess {String} result.message Review deleted successfully
   *
   * @apiError {Object} 401 Not authenticated
   * @apiError {Object} 403 Not authorized (not review owner or admin)
   * @apiError {Object} 404 Review not found
   */
  .delete(authenticateToken, validateReviewIdParam, deleteReview); // only author or admin can delete

export default router;
