import React, { useState } from 'react';

const TransactionsTable = ({ transactions, fetchTransactions, month }) => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 10;

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    fetchTransactions(month, e.target.value, 1, perPage);
    setPage(1);
  };

  const handleNextPage = () => {
    fetchTransactions(month, search, page + 1, perPage);
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    fetchTransactions(month, search, page - 1, perPage);
    setPage(page - 1);
  };

  return (
    <div>
      <h2>Transactions Table</h2>
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Search transactions"
      />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Date of Sale</th>
            <th>Sold</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction._id}>
              <td>{transaction.productTitle}</td>
              <td>{transaction.productDescription}</td>
              <td>{transaction.productPrice}</td>
              <td>{transaction.dateOfSale}</td>
              <td>{transaction.isSold ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
      <button onClick={handleNextPage}>Next</button>
    </div>
  );
};

export default TransactionsTable;
