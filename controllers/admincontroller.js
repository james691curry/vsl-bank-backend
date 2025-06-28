// controllers/adminController.js
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const { isValidTransactionStatus } = require('../utils/transactionStatus');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate('user', 'fullName email');
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.updateTransactionStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!isValidTransactionStatus(status)) {
    return res.status(400).json({ msg: 'Invalid status value' });
  }

  try {
    const transaction = await Transaction.findById(id).populate('user');
    if (!transaction) return res.status(404).json({ msg: 'Transaction not found' });

    transaction.status = status;
    transaction.updatedAt = new Date();
    await transaction.save();

    // Process balance if approved
    if (status === 'approved') {
      const user = await User.findById(transaction.user._id);
      if (transaction.type === 'deposit' || transaction.type === 'loan') {
        user.balance += transaction.amount;
      } else if (transaction.type === 'withdrawal') {
        user.balance -= transaction.amount;
      }
      await user.save();
    }

    res.json({ msg: 'Transaction updated', transaction });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.adjustUserBalance = async (req, res) => {
  const { id } = req.params;
  const { amount, action } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.balance = action === 'add' ? user.balance + amount : user.balance - amount;
    await user.save();

    res.json({ msg: `Balance ${action === 'add' ? 'increased' : 'decreased'} successfully`, balance: user.balance });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
