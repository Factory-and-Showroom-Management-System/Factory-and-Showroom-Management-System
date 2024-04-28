const express = require('express');
const productController = require('../controllers/product.controller');

const router = express.Router();

//show products
router.get('/showproducts', productController.showProduct);

//add to product
router.post('/addproduct', productController.addProduct);

//update product
router.put('/updateproduct/:productId', productController.updateProduct);

//delete product
router.delete('/deleteproduct/:productId', productController.deleteProduct);


module.exports = router;