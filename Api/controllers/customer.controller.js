const moment = require('moment');
const Validator = require('fastest-validator');
const models = require('../models');
const { or } = require('sequelize');


//creat function customers table show all
function showCustomer(req, res) {
    models.Customer.findAll().then(result => {
        if (result) {
            res.json({
                success: true,
                message: 'Load Customer',
                data: result
            });
        } else {
            res.json({
                success: false,
                message: 'No Customer Found',
                data: {}
            });
        }
    });
}

//Crate Function to add Customer table(customerId, name, address, phone, numberOf) and validation
async function addCustomer(req, res) {
    const { customerId, name, address, phone, numberOf } = req.body;

    const schema = {
        customerId: 'string|empty:false',
        name: 'string|empty:false',
        address: 'string|empty:false',
        phone: 'string|empty:false',
        numberOf: 'number|empty:false'
    }

    const v = new Validator();
    const validationResponse = v.validate(req.body, schema);

    if (validationResponse !== true) {
        return res.status(400).json({
            success: false,
            message: 'Validation Failed',
            errors: validationResponse
        });
    }

    models.Customer.create({
        customerId: customerId,
        name: name,
        address: address,
        phone: phone,
        numberOf: numberOf
    }).then(result => {
        res.status(201).json({
            success: true,
            message: 'Customer Created',
            data: result
        });
    }).catch(err => {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err
        });
    });
}


//Crate Function to update Customer table(customerId, name, address, phone, numberOf) and validation
async function updateCustomer(req, res) {
    const { customerId, name, address, phone, numberOf } = req.body;

    const schema = {
        customerId: 'string|empty:false',
        name: 'string|empty:false',
        address: 'string|empty:false',
        phone: 'string|empty:false',
        numberOf: 'number|empty:false'
    }

    const v = new Validator();
    const validationResponse = v.validate(req.body, schema);

    if (validationResponse !== true) {
        return res.status(400).json({
            success: false,
            message: 'Validation Failed',
            errors: validationResponse
        });
    }

    models.Customer.update({
        name: name,
        address: address,
        phone: phone,
        numberOf: numberOf
    }, {
        where: {
            customerId: customerId
        }
    }).then(result => {
        res.status(200).json({
            success: true,
            message: 'Customer Updated',
            data: result
        });
    }).catch(err => {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err
        });
    });
}

//Crate Function to delete Customer table(customerId) and validation
async function deleteCustomer(req, res) {
    const customerId = req.params.customerId;
    models.Customer.findByPk(customerId)
    .then(customer => {
        if (!customer) {
            return res.status(404).json({
                message: 'Customer Not Found',
            });
        }
        customer.destroy()
            .then(result => {
                res.status(200).json({
                    success: true,
                    message: 'Customer Deleted',
                    data: result
                });
            })
            .catch(error => {
                res.status(500).json({
                    message: 'Internal Server Error',
                    error: error
                });
            });
    })
    .catch(error => {
        res.status(500).json({
            message: 'Internal Server Error',
            error: error
        });
    });
}
 
module.exports = {
    showCustomer,
    addCustomer,
    updateCustomer,
    deleteCustomer
};

