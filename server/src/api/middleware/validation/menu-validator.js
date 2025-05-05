import {body, param} from 'express-validator';
import {handleValidationErrors, sanitizeInput} from './shared.js';

const SAFE_REGEX = /^[a-zA-Z0-9äöåÄÖÅ\s.,!?'"()\-–—:;]+$/u;

const validateMenuItemCreation = [
  sanitizeInput(['pizza_name', 'pizza_description']),
  body('pizza_name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .matches(SAFE_REGEX)
    .withMessage('Invalid characters')
    .escape()
    .stripLow(),
  body('pizza_description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .matches(SAFE_REGEX)
    .withMessage('Invalid characters')
    .escape()
    .stripLow(),
  body('price')
    // Enimmäishinta asetettu estämään input erroreita
    .isFloat({min: 0, max: 1000})
    .withMessage('Price must be a non-negative number or max 1000'),
  body('image_url').trim().isURL().withMessage('Image must be a valid URL'),
  handleValidationErrors,
];

// const validateMenuItemUpdate = [...validateMenuItemCreation];

const validateMenuIdParam = [
  param('id').isInt().withMessage('Invalid menu item ID'),
  handleValidationErrors,
];

export {validateMenuItemCreation, validateMenuIdParam};
