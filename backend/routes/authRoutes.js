const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware');

// Public auth routes
router.post('/register', register);
router.post('/login', login);

// Protected user profile route
router.get('/me', authenticateToken, getProfile);

module.exports = router;
