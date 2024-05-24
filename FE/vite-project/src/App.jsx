import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionsTable from './components/TransactionsTable.jsx';
import TransactionsStatistics from './components/TransactionsStatistics.jsx';
import TransactionsBarChart from './components/TransactionsBarChart.jsx';
import TransactionsPieChart from './components/TransactionsPieChart.jsx';

const App = () => {
  const [month, setMonth] = useState('03'); // Default to March
  const [transactions, setTransactions] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [barChartData, setBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);

  const fetchTransactions = async (month, search = '', page = 1, perPage = 10) => {
    try {
      const response = await axios.get(`/api/transactions`, {
        params: { month, search, page, per_page: perPage }
      });
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const fetchStatistics = async (month) => {
    try {
      const response = await axios.get(`/api/statistics`, { params: { month } });
      setStatistics(response.data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  const fetchBarChartData = async (month) => {
    try {
      const response = await axios.get(`/api/bar-chart`, { params: { month } });
      setBarChartData(response.data);
    } catch (error) {
      console.error('Error fetching bar chart data:', error);
    }
  };

  const fetchPieChartData = async (month) => {
    try {
      const response = await axios.get(`/api/pie-chart`, { params: { month } });
      setPieChartData(response.data);
    } catch (error) {
      console.error('Error fetching pie chart data:', error);
    }
  };

  useEffect(() => {
    fetchTransactions(month);
    fetchStatistics(month);
    fetchBarChartData(month);
    fetchPieChartData(month);
  }, [month]);

  return (
    <div className="App">
      <h1>Transactions Dashboard</h1>
      <label htmlFor="month">Select Month: </label>
      <select id="month" value={month} onChange={e => setMonth(e.target.value)}>
        <option value="01">January</option>
        <option value="02">February</option>
        <option value="03">March</option>
        <option value="04">April</option>
        <option value="05">May</option>
        <option value="06">June</option>
        <option value="07">July</option>
        <option value="08">August</option>
        <option value="09">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>

      <TransactionsTable transactions={transactions} fetchTransactions={fetchTransactions} month={month} />
      <TransactionsStatistics statistics={statistics} />
      <TransactionsBarChart data={barChartData} />
      <TransactionsPieChart data={pieChartData} />
    </div>
  );
};

export default App;
