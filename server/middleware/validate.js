import { body, validationResult } from 'express-validator';

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array(),
    });
  }
  next();
};

export const complaintBodyRules = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('organization_id').optional().isString(),
  body('complaint_id').optional().isString(),
  body('departments').optional().isArray(),
  body('index_after_analysis').optional().isBoolean(),
];

export const responseBodyRules = [
  body('title').trim().notEmpty(),
  body('description').trim().notEmpty(),
  body('status').optional().isString(),
  body('category').optional().isString(),
];

export const analyticsBodyRules = [body('stats').isObject().withMessage('stats object is required')];
