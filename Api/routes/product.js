const express = require('express');
const productController = require('../controllers/product.controller');

const router = express.Router();


router.post('/save', productController.productSave);

router.get('/view', productController.productView);

router.get('/view/:tableId', productController.productViewOne);

router.put('/update/:tableId', productController.productUpdate);

router.delete('/delete/:tableId', productController.productDelete);



module.exports = router;