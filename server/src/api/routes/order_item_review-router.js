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

/**
 * @api {get} /order-item-reviews Get all order item reviews
 * @apiName GetAllOrderItemReviews
 * @apiGroup OrderItemReviews
 *
 * @apiSuccess {Object[]} reviews List of reviews
 * @apiSuccess {Number} reviews.item_review_id Review ID
 * @apiSuccess {Number} reviews.user_id User ID who made the review
 * @apiSuccess {Number} reviews.pizza_id Pizza ID being reviewed
 * @apiSuccess {Number} reviews.rating Rating (1-5)
 * @apiSuccess {String} reviews.comment Review comment
 * @apiSuccess {Date} reviews.created_at Review creation date
 * @apiSuccess {String} reviews.pizza_name Name of the pizza
 * @apiSuccess {String} reviews.reviewer_name Name of the reviewer
 */
reviewRouter
  .route('/')
  .get(fetchOrderItemReviews)

  /**
   * @api {post} /order-item-reviews Create pizza review
   * @apiName CreateOrderItemReview
   * @apiGroup OrderItemReviews
   *
   * @apiHeader {String} Authorization Bearer token
   *
   * @apiBody {Number} order_item_id ID of the pizza being reviewed
   * @apiBody {Number} rating Rating between 1-5
   * @apiBody {String} comment Review comment (must match safe regex pattern)
   *
   * @apiSuccess {Object} review Created review object
   * @apiSuccess {Number} review.order_item_review_id ID of created review
   *
   * @apiError {Object} 401 Not authenticated
   * @apiError {Object} 400 Validation error
   */
  .post(authenticateToken, validateCreateOrderItemReview, postOrderItemReview);

/**
 * @api {get} /order-item-reviews/pizza Get reviews by pizza ID
 * @apiName GetPizzaReviews
 * @apiGroup OrderItemReviews
 *
 * @apiParam {Number} pizza_id Pizza ID to get reviews for (query parameter, like order-item-reviews/pizza?pizza_id=26)
 *
 * @apiSuccess {Object[]} reviews List of reviews for the pizza
 * @apiSuccess {Number} reviews.item_review_id Review ID
 * @apiSuccess {Number} reviews.user_id User ID who made the review
 * @apiSuccess {Number} reviews.pizza_id Pizza ID being reviewed
 * @apiSuccess {Number} reviews.rating Rating given
 * @apiSuccess {String} reviews.comment Review comment
 * @apiSuccess {Date} reviews.created_at Review date
 * @apiSuccess {String} reviews.pizza_name Name of the pizza
 * @apiSuccess {String} reviews.reviewer_name Name of reviewer
 *
 * @apiError {Object} 400 Invalid pizza_id
 */
reviewRouter
  .route('/pizza')
  .get(validateOrderItemReviewPizzaIdParam, fetchOrderItemReviewsByPizzaId);

/**
 * @api {delete} /order-item-reviews/:id Delete review
 * @apiName DeleteOrderItemReview
 * @apiGroup OrderItemReviews
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
reviewRouter
  .route('/:id')
  .delete(
    authenticateToken,
    validateOrderItemReviewIdParam,
    deleteOrderItemReviewController
  );

export default reviewRouter;
