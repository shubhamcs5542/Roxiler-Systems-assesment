import React from 'react';

const TransactionsStatistics = ({ statistics }) => {
  return (
    <div>
      <h2>Transactions Statistics</h2>
      <div>Total Sale Amount: {statistics.totalSaleAmount}</div>
      <div>Total Sold Items: {statistics.totalSoldItems}</div>
      <div>Total Not Sold Items: {statistics.totalNotSoldItems}</div>
    </div>
  );
};

export default TransactionsStatistics;
