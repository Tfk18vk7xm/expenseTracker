const expenseService = require('../services/expenseService');

const getExpenses = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { category, search } = req.query;

    const expenses = await expenseService.getUserExpenses(userId, { category, search });
    res.status(200).json({
      success: true,
      count: expenses.length,
      data: expenses,
    });
  } catch (error) {
    next(error);
  }
};

const createExpense = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const expense = await expenseService.createExpense(userId, req.body);
    res.status(201).json({
      success: true,
      message: 'Expense created successfully.',
      data: expense,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updateExpense = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const updatedExpense = await expenseService.updateExpense(id, userId, req.body);
    res.status(200).json({
      success: true,
      message: 'Expense updated successfully.',
      data: updatedExpense,
    });
  } catch (error) {
    res.status(error.statusCode || 400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteExpense = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    await expenseService.deleteExpense(id, userId);
    res.status(200).json({
      success: true,
      message: 'Expense deleted successfully.',
    });
  } catch (error) {
    res.status(error.statusCode || 400).json({
      success: false,
      message: error.message,
    });
  }
};

const getSummary = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const summary = await expenseService.getExpenseSummary(userId);
    res.status(200).json({
      success: true,
      data: summary,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  getSummary,
};
