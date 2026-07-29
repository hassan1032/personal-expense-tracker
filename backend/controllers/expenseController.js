import Expense from "../models/Expense.js";

const createExpense = async (req, res) => {
  try {
    const { amount, description, category, date } = req.body;
    const expense = await Expense.create({ amount, description, category, date });
    res.status(201).json({ success: true, message: "Expense created successfully", data: expense });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.status(200).json({ success: true, count: expenses.length, data: expenses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const updateExpense = async (req, res) => {
  try {
    const { amount, description, category, date } = req.body;
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ success: false, message: "Expense not found" });
    }

    expense.amount = amount || expense.amount;
    expense.description = description || expense.description;
    expense.category = category || expense.category;
    expense.date = date || expense.date;

    const updatedExpense = await expense.save();
    res.status(200).json({ success: true, data: updatedExpense });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ success: false, message: "Expense not found" });
    }

    await expense.deleteOne();
    res.status(200).json({ success: true, message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense
};
