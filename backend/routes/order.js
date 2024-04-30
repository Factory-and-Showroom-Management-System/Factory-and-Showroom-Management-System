const express = require('express');
const orderController = require('../controllers/order.controller');
//const { route } = require('./user');



const router = express.Router();

router.post('/save', orderController.ordersave);

router.get('/view', orderController.orderview);

router.get('/view/:tableId', orderController.orderviewone);

router.put('/update/:tableId', orderController.orderupdate);

router.delete('/delete/:tableId', orderController.orderdelete);


module.exports = router;
