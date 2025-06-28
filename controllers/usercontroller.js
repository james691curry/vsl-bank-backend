// controllers/userController.js
const Transaction = require('../models/Transaction');

exports.createTransaction = async (req, res) => {
  const { type, amount, description } = req.body;
  try {
    const transaction = new Transaction({
      user: req.user.userId,
      type,
      amount,
      description,
      status: 'pending'
    });
    await transaction.save();
    res.status(201).json({ msg: 'Transaction submitted for approval', transaction });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getMyTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.userId }).sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
