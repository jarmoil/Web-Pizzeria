import {body, param, query} from 'express-validator';
import {handleValidationErrors, sanitizeInput} from './shared.js';

const SAFE_REGEX = /^[a-zA-Z0-9äöåÄÖÅ\s.,!?'"()\-–—:;]+$/u;

const validateCreateOrderItemReview = [
  sanitizeInput(['comment']),
  body('order_item_id')
    .isInt()
    .withMessage('Order item ID must be a valid integer'),
  body('rating')
    .isInt({min: 1, max: 5})
    .withMessage('Rating must be between 1 and 5'),
  body('comment')
    .trim()
    .notEmpty()
    .withMessage('Comment is required')
    .isString()
    .withMessage('Comment must be a valid string')
    .matches(SAFE_REGEX)
    .withMessage('Invalid characters')
    .escape()
    .stripLow(),
  handleValidationErrors,
];

const validateOrderItemReviewPizzaIdParam = [
  query('pizza_id').isInt().withMessage('Invalid order item review PIZZA ID'),
  handleValidationErrors,
];

const validateOrderItemReviewIdParam = [
  param('id').isInt().withMessage('Invalid order item review ID'),
  handleValidationErrors,
];

export {
  validateCreateOrderItemReview,
  validateOrderItemReviewIdParam,
  validateOrderItemReviewPizzaIdParam,
};
