const express = require('express');
const router = express.Router();
const ReportController = require('../controllers/reportController');
router.get('/income-summary', ReportController.incomeSummary);
router.get('/by-category', ReportController.byCategory);
router.get('/monthly-trend', ReportController.monthlyTrend);
module.exports = router;
