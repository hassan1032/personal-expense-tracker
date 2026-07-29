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
    const { search, category, startDate, endDate, page = 1, limit = 10 } = req.query;

    const query = {};

    // Search filter by description
    if (search && search.trim() !== "") {
      query.description = { $regex: search.trim(), $options: "i" };
    }

    // Category filter
    if (category && category !== "All" && category.trim() !== "") {
      query.category = category.trim();
    }

    // Date range filter
    if (startDate || endDate) {
      query.date = {};
      if (startDate && startDate.trim() !== "") {
        query.date.$gte = new Date(startDate);
      }
      if (endDate && endDate.trim() !== "") {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        query.date.$lte = end;
      }
    }

    // Total document count matching query
    const totalCount = await Expense.countDocuments(query);

    // Total spent matching current query filters
    const totalSpentResult = await Expense.aggregate([
      { $match: query },
      { $group: { _id: null, totalSpent: { $sum: "$amount" } } }
    ]);
    const totalSpent = totalSpentResult.length > 0 ? totalSpentResult[0].totalSpent : 0;

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, parseInt(limit, 10) || 10);
    const totalPages = Math.ceil(totalCount / limitNum) || 1;

    const expenses = await Expense.find(query)
      .sort({ date: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      count: expenses.length,
      totalCount,
      page: pageNum,
      totalPages,
      totalSpent,
      data: expenses
    });
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

    expense.amount = amount !== undefined ? amount : expense.amount;
    expense.description = description !== undefined ? description : expense.description;
    expense.category = category !== undefined ? category : expense.category;
    expense.date = date !== undefined ? date : expense.date;

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
