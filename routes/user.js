// routes/user.js
const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/authMiddleware');
const {
  createTransaction,
  getMyTransactions
} = require('../controllers/userController');

router.post('/transaction', auth, createTransaction);
router.get('/transactions', auth, getMyTransactions);

module.exports = router;
