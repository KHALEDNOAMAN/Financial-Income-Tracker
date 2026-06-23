const express = require('express');
const router = express.Router();
const FiscalController = require('../controllers/fiscalController');
router.get('/', FiscalController.getAll);
router.post('/:id/close', FiscalController.close);
module.exports = router;
