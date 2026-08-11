const db = require('../config/db');

const User = {
  /**
   * Find user by email address
   */
  async findByEmail(email) {
    const result = await db.query(
      'SELECT id, name, email, password_hash, created_at FROM users WHERE LOWER(email) = LOWER($1)',
      [email]
    );
    return result.rows[0];
  },

  /**
   * Find user by ID
   */
  async findById(id) {
    const result = await db.query(
      'SELECT id, name, email, created_at FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0];
  },

  /**
   * Create a new user record
   */
  async create({ name, email, passwordHash }) {
    const result = await db.query(
      'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email, created_at',
      [name, email, passwordHash]
    );
    return result.rows[0];
  },
};

module.exports = User;
