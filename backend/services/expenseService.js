const Expense = require('../models/expenseModel');

const expenseService = {
  /**
   * Process & validate expense creation
   */
  async createExpense(userId, expenseData) {
    const { title, amount, category, date, notes } = expenseData;

    if (!title || !amount || !category || !date) {
      throw new Error('Title, amount, category, and date are required fields.');
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      throw new Error('Amount must be a positive numeric value.');
    }

    return await Expense.create({
      userId,
      title: title.trim(),
      amount: numAmount,
      category,
      date,
      notes: notes ? notes.trim() : '',
    });
  },

  /**
   * Get user expenses with filtering
   */
  async getUserExpenses(userId, filters) {
    return await Expense.findAllByUser(userId, filters);
  },

  /**
   * Update an expense with validation
   */
  async updateExpense(id, userId, expenseData) {
    const existing = await Expense.findByIdAndUser(id, userId);
    if (!existing) {
      const error = new Error('Expense not found or unauthorized.');
      error.statusCode = 404;
      throw error;
    }

    const { title, amount, category, date, notes } = expenseData;
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      throw new Error('Amount must be a positive numeric value.');
    }

    return await Expense.update(id, userId, {
      title: title.trim(),
      amount: numAmount,
      category,
      date,
      notes: notes ? notes.trim() : '',
    });
  },

  /**
   * Delete expense
   */
  async deleteExpense(id, userId) {
    const existing = await Expense.findByIdAndUser(id, userId);
    if (!existing) {
      const error = new Error('Expense not found or unauthorized.');
      error.statusCode = 404;
      throw error;
    }

    return await Expense.delete(id, userId);
  },

  /**
   * Calculate summary metrics
   */
  async getExpenseSummary(userId) {
    return await Expense.getSummary(userId);
  },
};

module.exports = expenseService;
