const db = require('../config/db');

const Expense = {
  /**
   * Create a new expense for a user
   */
  async create({ userId, title, amount, category, date, notes }) {
    const result = await db.query(
      `INSERT INTO expenses (user_id, title, amount, category, date, notes)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, user_id, title, amount, category, date, notes, created_at`,
      [userId, title, amount, category, date, notes || null]
    );
    return result.rows[0];
  },

  /**
   * Get all expenses for a specific user with optional category & search filter
   */
  async findAllByUser(userId, { category, search } = {}) {
    let queryText = `
      SELECT id, user_id, title, amount, category, date, notes, created_at
      FROM expenses
      WHERE user_id = $1
    `;
    const params = [userId];

    if (category && category !== 'All') {
      params.push(category);
      queryText += ` AND category = $${params.length}`;
    }

    if (search && search.trim() !== '') {
      params.push(`%${search.trim()}%`);
      queryText += ` AND (title ILIKE $${params.length} OR notes ILIKE $${params.length})`;
    }

    queryText += ` ORDER BY date DESC, created_at DESC`;

    const result = await db.query(queryText, params);
    return result.rows;
  },

  /**
   * Find a single expense by ID and user_id (for ownership safety)
   */
  async findByIdAndUser(id, userId) {
    const result = await db.query(
      'SELECT id, user_id, title, amount, category, date, notes, created_at FROM expenses WHERE id = $1 AND user_id = $2',
      [id, userId]
    );
    return result.rows[0];
  },

  /**
   * Update an existing expense
   */
  async update(id, userId, { title, amount, category, date, notes }) {
    const result = await db.query(
      `UPDATE expenses
       SET title = $1, amount = $2, category = $3, date = $4, notes = $5
       WHERE id = $6 AND user_id = $7
       RETURNING id, user_id, title, amount, category, date, notes, created_at`,
      [title, amount, category, date, notes || null, id, userId]
    );
    return result.rows[0];
  },

  /**
   * Delete an expense
   */
  async delete(id, userId) {
    const result = await db.query(
      'DELETE FROM expenses WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, userId]
    );
    return result.rowCount > 0;
  },

  /**
   * Get summary statistics for user expenses (Total spent, current month spent, category stats)
   */
  async getSummary(userId) {
    const totalResult = await db.query(
      `SELECT COALESCE(SUM(amount), 0) AS total_amount, COUNT(id) AS total_count FROM expenses WHERE user_id = $1`,
      [userId]
    );

    const monthResult = await db.query(
      `SELECT COALESCE(SUM(amount), 0) AS month_amount
       FROM expenses
       WHERE user_id = $1
       AND DATE_TRUNC('month', date) = DATE_TRUNC('month', CURRENT_DATE)`,
      [userId]
    );

    const categoryResult = await db.query(
      `SELECT category, SUM(amount) AS total, COUNT(id) AS count
       FROM expenses
       WHERE user_id = $1
       GROUP BY category
       ORDER BY total DESC`,
      [userId]
    );

    return {
      totalSpent: parseFloat(totalResult.rows[0].total_amount),
      totalCount: parseInt(totalResult.rows[0].total_count, 10),
      monthSpent: parseFloat(monthResult.rows[0].month_amount),
      categoryBreakdown: categoryResult.rows.map(r => ({
        category: r.category,
        total: parseFloat(r.total),
        count: parseInt(r.count, 10),
      })),
    };
  },
};

module.exports = Expense;
