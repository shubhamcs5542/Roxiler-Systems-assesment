const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const initializeRouter = require('./routes/initialize');
const transactionsRouter = require('./routes/transactions');
const statisticsRouter = require('./routes/statistics');
const barChartRouter = require('./routes/barChart');
const pieChartRouter = require('./routes/pieChart');
const combinedDataRouter = require('./routes/combinedData');

const cors = require('cors');
app.use(cors());


const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mern-challenge', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});

app.use('/api', initializeRouter);
app.use('/api', transactionsRouter);
app.use('/api', statisticsRouter);
app.use('/api', barChartRouter);
app.use('/api', pieChartRouter);
app.use('/api', combinedDataRouter);

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
