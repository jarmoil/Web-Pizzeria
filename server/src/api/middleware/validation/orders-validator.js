import {body, param} from 'express-validator';
import {handleValidationErrors, sanitizeInput} from './shared.js';

const validateCreateOrder = [
  sanitizeInput(['address']),
  body('address')
    .trim()
    .notEmpty()
    .withMessage('Address is required')
    .matches(/^[a-zA-Z0-9\s\-_,]+$/)
    .withMessage(
      'Address can only contain letters, numbers, spaces, dashes, underscores and commas'
    )
    .escape()
    .stripLow(),
  body('items')
    .isArray({min: 1})
    .withMessage('At least one item is required')
    .custom((items) => {
      return items.every((item) => item.pizza_id && item.quantity);
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
