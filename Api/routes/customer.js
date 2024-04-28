const express = require('express');
const customerController = require('../controllers/customer.controller');

const router = express.Router();

//show customers
router.get('/showcustomers', customerController.showCustomer);

//add to customer
router.post('/addcustomer', customerController.addCustomer);

//update customer
router.put('/updatecustomer/:customerId', customerController.updateCustomer);

//delete customer
router.delete('/deletecustomer/:customerId', customerController.deleteCustomer);


module.exports = router;


