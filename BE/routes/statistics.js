const express = require('express');
const Transaction = require('../models/Transaction');

const router = express.Router();

router.get('/statistics', async (req, res) => {
  const { month } = req.query;
  const query = month ? { dateOfSale: { $regex: `-${month}-` } } : {};

  try {
    const totalSaleAmount = await Transaction.aggregate([
      { $match: query },
      { $group: { _id: null, total: { $sum: "$productPrice" } } }
    ]);

    const totalSoldItems = await Transaction.countDocuments({ ...query, isSold: true });
    const totalNotSoldItems = await Transaction.countDocuments({ ...query, isSold: false });

    res.status(200).json({
      totalSaleAmount: totalSaleAmount[0]?.total || 0,
      totalSoldItems,
      totalNotSoldItems
    });
  } catch (error) {
    res.status(500).send('Error fetching statistics');
  }
});

module.exports = router;
