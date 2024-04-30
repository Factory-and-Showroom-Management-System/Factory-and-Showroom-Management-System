const express = require('express');
const customerController = require('../controllers/customer.controller');
//const { route } = require('./user');

const router = express.Router();

router.post('/save', customerController.customersave);

router.get('/view', customerController.customerview);

router.get('/view/:tableId', customerController.customerviewone);

router.put('/update/:tableId', customerController.customerupdate);

router.delete('/delete/:tableId', customerController.customerdelete);


module.exports = router;