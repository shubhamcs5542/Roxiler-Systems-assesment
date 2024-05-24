const express = require('express');
const Transaction = require('../models/Transaction');

const router = express.Router();

router.get('/bar-chart', async (req, res) => {
  const { month } = req.query;
  const query = month ? { dateOfSale: { $regex: `-${month}-` } } : {};

  const priceRanges = [
    { min: 0, max: 100 },
    { min: 101, max: 200 },
    { min: 201, max: 300 },
    { min: 301, max: 400 },
    { min: 401, max: 500 },
    { min: 501, max: 600 },
    { min: 601, max: 700 },
    { min: 701, max: 800 },
    { min: 801, max: 900 },
    { min: 901, max: Infinity },
  ];

  try {
    const result = await Promise.all(priceRanges.map(async (range) => {
      const count = await Transaction.countDocuments({
        ...query,
        productPrice: { $gte: range.min, $lt: range.max === Infinity ? undefined : range.max }
      });
      return { range: `${range.min}-${range.max === Infinity ? 'above' : range.max}`, count };
    }));

    res.status(200).json(result);
  } catch (error) {
    res.status(500).send('Error fetching bar chart data');
  }
});

module.exports = router;
