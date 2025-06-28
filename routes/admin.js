// routes/admin.js
const express = require('express');
const router = express.Router();
const { auth, adminOnly } = require('../middleware/authMiddleware');
const {
  getAllUsers,
  getAllTransactions,
  updateTransactionStatus,
  adjustUserBalance
} = require('../controllers/adminController');

router.get('/users', auth, adminOnly, getAllUsers);
router.get('/transactions', auth, adminOnly, getAllTransactions);
router.put('/transaction/:id/status', auth, adminOnly, updateTransactionStatus);
router.put('/user/:id/balance', auth, adminOnly, adjustUserBalance);

module.exports = router;
