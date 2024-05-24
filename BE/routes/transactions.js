const express = require('express');
const Transaction = require('../models/Transaction');

const router = express.Router();

router.get('/transactions', async (req, res) => {
  const { month, search, page = 1, per_page = 10 } = req.query;

  const query = {};
  if (month) {
    query.dateOfSale = { $regex: `-${month}-` };
  }
  if (search) {
    query.$or = [
      { productTitle: new RegExp(search, 'i') },
      { productDescription: new RegExp(search, 'i') },
      { productPrice: new RegExp(search, 'i') },
    ];
  }

  try {
    const transactions = await Transaction.find(query)
      .skip((page - 1) * per_page)
      .limit(parseInt(per_page));
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).send('Error fetching transactions');
  }
});

module.exports = router;
