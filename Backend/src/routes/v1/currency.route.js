const express = require('express');

const transferDataController = require('../../modules/currency/controller');

const router = express.Router();

router.get('/transferData', transferDataController.transferData);
router.get('/getAllData', transferDataController.getAllData);



module.exports = router;