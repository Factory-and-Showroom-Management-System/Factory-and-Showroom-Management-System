const express = require('express');
const inventoryProductController = require('../controllers/inventory.product.controller');

const router = express.Router();




router.get('/view', inventoryProductController.productView);

router.get('/view/:tableId', inventoryProductController.productViewOne);

router.put('/update/:tableId', inventoryProductController.productUpdate);



module.exports = router;