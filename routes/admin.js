// routes/admin.js
const express = require('express');
const router = express.Router();
const { approveTransaction, getAllUsers } = require('../controllers/admincontroller');

// @route   POST /api/admin/approve-transaction
router.post('/approve-transaction', approveTransaction);

// @route   GET /api/admin/users
router.get('/users', getAllUsers);

module.exports = router;