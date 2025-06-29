// routes/user.js
const express = require('express');
const router = express.Router();
const { getUserProfile, updateUser } = require('../controllers/userController');

// @route   GET /api/user/profile
router.get('/profile', getUserProfile);

// @route   PUT /api/user/update
router.put('/update', updateUser);

module.exports = router;