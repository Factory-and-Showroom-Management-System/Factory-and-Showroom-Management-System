

const express = require('express');
const orderController = require('../controllers/order.controller');

const router = express.Router();

//show orders
router.get('/showorders', orderController.showOrder);

//add to order
router.post('/addorder', orderController.addOrder);

//update order
router.put('/updateorder/:orderId', orderController.updateOrder);

//delete order
router.delete('/deleteorder/:orderId', orderController.deleteOrder);


module.exports = router;
