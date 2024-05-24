const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  productTitle: String,
  productDescription: String,
  productPrice: Number,
  dateOfSale: Date,
  isSold: Boolean,
  category: String,
});

module.exports = mongoose.model('Transaction', transactionSchema);
