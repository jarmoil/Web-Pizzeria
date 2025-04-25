import {body, param} from 'express-validator';
import {handleValidationErrors, sanitizeInput} from './shared.js';

const validateCreateReview = [
  sanitizeInput(['comment']),
  body('rating')
    .isInt({min: 1, max: 5})
    .withMessage('Rating must be between 1 and 5'),
  body('comment')
    .trim()
    .notEmpty()
    .withMessage('Comment is required')
    .isString()
    .withMessage('Comment must be a valid string')
    .matches(/^[a-zA-Z0-9\s\-_,]+$/)
    .withMessage('Invalid characters')
    .escape()
    .stripLow(),
  handleValidationErrors,
];

const validateReviewIdParam = [
  param('id').isInt().withMessage('Invalid review ID'),
  handleValidationErrors,
];

export {validateCreateReview, validateReviewIdParam};
