import {body, param} from 'express-validator';
import {handleValidationErrors, sanitizeInput} from './shared.js';

const SAFE_REGEX = /^[a-zA-Z0-9äöåÄÖÅ\s.,!?'"()\-–—:;]+$/u;

const validateCreateOrder = [
  sanitizeInput(['address']),
  body('address')
    .trim()
    .notEmpty()
    .withMessage('Address is required')
    .matches(SAFE_REGEX)
    .withMessage('Invalid characters')
    .escape()
    .stripLow(),
  body('items')
    .isArray({min: 1})
    .withMessage('At least one item is required')
    .custom((items) => {
      return (
        Array.isArray(items) &&
        items.every((item) => item.pizza_id && item.quantity)
      );
    })
    .withMessage('Each item must have pizza_id and quantity'),
  body('items.*.pizza_id')
    .isInt()
    .withMessage('Pizza ID must be a valid integer'),
  body('items.*.quantity')
    .isInt({min: 1})
    .withMessage('Quantity must be a positive integer'),
  handleValidationErrors,
];

const validateUpdateOrderStatus = [
  body('order_status')
    .isIn(['pending', 'processing', 'completed', 'cancelled'])
    .withMessage('Invalid order status'),
  handleValidationErrors,
];

const validateOrderIdParam = [
  param('id').isInt().withMessage('Invalid order ID'),
  handleValidationErrors,
];

export {validateCreateOrder, validateUpdateOrderStatus, validateOrderIdParam};
