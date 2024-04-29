const express = require('express');

const transferDataController = require('../../modules/currency/controller');

const router = express.Router();

router.put('/transferData', transferDataController.transferData);
router.get('/getAllData', transferDataController.getAllData);
router.post('/addCurrency',transferDataController.addCurrency)
router.put('/deleteCurrency/:id',transferDataController.deleteCurrency)
router.get('/getCurrencyById/:id', transferDataController.getCurrencyById);
router.put('/updateCurrency/:id', transferDataController.updateCurrency);



module.exports = router;