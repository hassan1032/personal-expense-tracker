import express from "express";
const router = express.Router();
import {
  getExpenses,
  createExpense,
  deleteExpense
} from "../controllers/expenseController.js";
import {
  expenseValidationRules,
  validateExpense
} from "../validators/expenseValidator.js";

router.route("/")
  .get(getExpenses)
  .post(expenseValidationRules, validateExpense, createExpense);

router.route("/:id")
  .delete(deleteExpense);

export default router;
