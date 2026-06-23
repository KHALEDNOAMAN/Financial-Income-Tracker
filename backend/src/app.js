const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const incomeRoutes = require('./routes/incomeRoutes');
const accountRoutes = require('./routes/accountRoutes');
const fiscalRoutes = require('./routes/fiscalRoutes');
const reportRoutes = require('./routes/reportRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*', credentials: true }));
app.use(express.json());
if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'));

app.get('/api/health', (req, res) => res.json({ success: true, service: 'Financial Income Tracker' }));
app.use('/api/income', incomeRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/fiscal-periods', fiscalRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/transactions', transactionRoutes);
app.use((req, res) => res.status(404).json({ success: false, error: { message: 'Route not found' } }));
app.use(errorHandler);

module.exports = app;
