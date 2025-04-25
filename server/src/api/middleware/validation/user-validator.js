import {body, param} from 'express-validator';
import {handleValidationErrors, sanitizeInput} from './shared.js';

const userValidator = [
  sanitizeInput(['user_name', 'user_email', 'user_address']),

  body('user_name')
    .trim()
    .notEmpty()
    .withMessage('User name is required')
    .isLength({min: 3})
    .withMessage('User name must be at least 3 characters long')
    .matches(/^[a-zA-Z0-9\s\-_,]+$/)
    .withMessage('Invalid characters')
    .escape()
    .stripLow(),

  body('user_email')
    .trim()
    .isEmail()
    .withMessage('Invalid email address')
    .normalizeEmail(),

  body('user_password')
    .trim()
    .isLength({min: 6})
    .withMessage('Password must be at least 6 characters long'),

  body('phone_number')
    .matches(/^\+?[1-9]\d{1,14}$/)
    .withMessage('Invalid phone number'),

  body('user_address')
    .trim()
    .notEmpty()
    .withMessage('User address is required')
    .matches(/^[a-zA-Z0-9\s\-_,]+$/)
    .withMessage('Invalid characters')
    .escape()
    .stripLow(),

  body('profile_picture')
    .optional()
    .isURL()
    .withMessage('Profile picture must be a valid URL'),
  handleValidationErrors,
];

const loginValidator = [
  sanitizeInput(['user_email']),
  body('user_email')
    .trim()
    .isEmail()
    .withMessage('Invalid email address')
    .normalizeEmail(),
  body('user_password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({min: 6})
    .withMessage('Password must be at least 6 characters long'),
  handleValidationErrors,
];

const validateUserIdParam = [
  param('id').isInt().withMessage('Invalid user ID'),
  handleValidationErrors,
];

export {userValidator, validateUserIdParam, loginValidator};
