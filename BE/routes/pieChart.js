const express = require('express');
const Transaction = require('../models/Transaction');

const router = express.Router();

router.get('/pie-chart', async (req, res) => {
  const { month } = req.query;
  const query = month ? { dateOfSale: { $regex: `-${month}-` } } : {};

  try {
    const categories = await Transaction.aggregate([
      { $match: query },
      { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).send('Error fetching pie chart data');
  }
});

module.exports = router;
