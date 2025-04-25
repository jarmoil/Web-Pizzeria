import {body, param} from 'express-validator';
import {handleValidationErrors, sanitizeInput} from './shared.js';

const validateMenuItemCreation = [
  sanitizeInput(['name', 'description']),
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .matches(/^[a-zA-Z0-9\s\-_]+$/)
    .withMessage(
      'Name can only contain letters, numbers, spaces, dashes, and underscores'
    )
    .escape()
    .stripLow(),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .matches(/^[a-zA-Z0-9\s\-_]+$/)
    .withMessage(
      'Name can only contain letters, numbers, spaces, dashes, and underscores'
    )
    .escape()
    .stripLow(),
  body('price')
    // ei varmaan ton kalliimpaa pizzaa ole
    .isFloat({min: 0, max: 1000})
    .withMessage('Price must be a non-negative number or max 1000'),
  body('image').trim().isURL().withMessage('Image must be a valid URL'),
  handleValidationErrors,
];

const validateMenuItemUpdate = [...validateMenuItemCreation];

const validateMenuIdParam = [
  param('id').isInt().withMessage('Invalid menu item ID'),
  handleValidationErrors,
];

export {validateMenuItemCreation, validateMenuItemUpdate, validateMenuIdParam};
