const express = require('express');
const router = express.Router();
const IncomeController = require('../controllers/incomeController');
router.get('/', IncomeController.getAll);
router.get('/:id', IncomeController.getById);
router.post('/', IncomeController.create);
router.put('/:id', IncomeController.update);
module.exports = router;
