const express = require('express');
const router = express.Router();
const {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  getSummary,
} = require('../controllers/expenseController');
const authenticateToken = require('../middleware/authMiddleware');

// All expense routes are protected by JWT authentication
router.use(authenticateToken);

router.get('/', getExpenses);
router.post('/', createExpense);
router.get('/summary', getSummary);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

module.exports = router;
