import { body, validationResult } from "express-validator";

const expenseValidationRules = [
  body("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isFloat({ min: 0.01 })
    .withMessage("Amount must be a number greater than zero"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required"),
  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required"),
  body("date")
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage("Invalid date format (must be YYYY-MM-DD)")
];

const validateExpense = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({ field: err.path, message: err.msg }))
    });
  }
  next();
};

export {
  expenseValidationRules,
  validateExpense
};
