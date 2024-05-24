// src/components/TransactionsPieChart.jsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const TransactionsPieChart = ({ data }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Transactions Pie Chart',
      },
    },
  };

  return <Pie options={options} data={data} />;
};

export default TransactionsPieChart;
