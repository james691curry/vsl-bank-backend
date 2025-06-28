// utils/transactionStatus.js

const validStatuses = ['pending', 'approved', 'declined', 'failed'];

const isValidTransactionStatus = (status) => {
  return validStatuses.includes(status);
};

module.exports = { isValidTransactionStatus, validStatuses };
