import {validationResult} from 'express-validator';
import sanitizeHtml from 'sanitize-html';

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  next();
};

export const sanitizeInput = (fields) => (req, res, next) => {
  fields.forEach((field) => {
    if (req.body[field]) {
      req.body[field] = sanitizeHtml(req.body[field], {
        allowedTags: [],
        allowedAttributes: {},
      });
    }
  });
  next();
};
