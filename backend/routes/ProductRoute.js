
const express = require('express');
const FinishProductController = require('../controllers/finishProduct.controller');

const router = express.Router();

router.get('/showProduct', FinishProductController.showProduct);
router.post('/addProduct', FinishProductController.addProduct);
router.get('/getProduct/:id', FinishProductController.getProduct);

module.exports = router;

