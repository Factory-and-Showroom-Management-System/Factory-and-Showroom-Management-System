const express = require('express');
const adminProductController = require('../controllers/admin.product.controller');

const router = express.Router();


router.post('/save', adminProductController.productSave);

router.get('/view', adminProductController.productView);

router.get('/view/:tableId', adminProductController.productViewOne);

router.put('/update/:tableId', adminProductController.productUpdate);

router.delete('/delete/:tableId', adminProductController.productDelete);



module.exports = router;