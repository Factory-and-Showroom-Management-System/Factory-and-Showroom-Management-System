const moment = require('moment');
const Validator = require('fastest-validator');
const models = require('../models');
const sequelize = require('sequelize');

// Function to save a new customer
function customersave(req, res) {
    const customer = {
        customerId: req.body.customerId,
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        numberOf: req.body.numberOf
    };

    // Validation schema
    const schema = {
        customerId: { type: "string", optional: false },
        name: { type: "string", optional: false },
        address: { type: "string", optional: false },
        phone: { type: "string", optional: false },
        numberOf: { type: "number", optional: false }
    };

    // Create a validator instance
    const v = new Validator();
    const validationResponse = v.validate(customer, schema);

    // Check if validation failed
    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    // Save customer data
    models.Customer.create(customer).then(result => {
        res.status(201).json({
            message: "Customer created successfully",
            customer: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}


// Function to view all customers
function customerview(req, res) {
    models.Customer.findAll()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
}

// Function to view a customer by tableId
function customerviewone(req, res) {
    const tableId = req.params.tableId;

    // Find customer by ID
    models.Customer.findByPk(tableId)
        .then(customer => {
            if (!customer) {
                return res.status(404).json({
                    message: "Customer not found"
                });
            }
            res.status(200).json({
                message: "Customer found",
                customer: customer
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
}

// Function to update a customer by ID
function customerupdate(req, res) {
    const tableId = req.params.tableId;
    const updatedCustomer = {
        customerId: req.body.customerId,
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        numberOf: req.body.numberOf
    };

    // Validation schema
    const schema = {
        customerId: { type: "string", optional: false },
        name: { type: "string", optional: false },
        address: { type: "string", optional: false },
        phone: { type: "string", optional: false },
        numberOf: { type: "number", optional: false }
    };

    // Validate updated customer data
    const v = new Validator();
    const validationResponse = v.validate(updatedCustomer, schema);

    // Check validation response
    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    // Update customer data
    models.Customer.findByPk(tableId)
        .then(customer => {
            if (!customer) {
                return res.status(404).json({
                    message: "Customer not found"
                });
            }
            return customer.update(updatedCustomer)
                .then(updatedCustomer => {
                    res.status(200).json({
                        message: "Customer updated successfully",
                        customer: updatedCustomer
                    });
                })
                .catch(error => {
                    res.status(500).json({
                        message: "Something went wrong",
                        error: error
                    });
                });
        })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
}

// Function to delete a customer by ID
function customerdelete(req, res) {
    const tableId = req.params.tableId;

    models.Customer.findByPk(tableId)
        .then(customer => {
            if (!customer) {
                return res.status(404).json({
                    message: "Customer not found"
                });
            }
            return customer.destroy()
                .then(() => {
                    res.status(200).json({
                        message: "Customer deleted successfully"
                    });
                })
                .catch(error => {
                    res.status(500).json({
                        message: "Something went wrong",
                        error: error
                    });
                });
        })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
}

module.exports = {
    customersave: customersave,
    customerview: customerview,
    customerviewone: customerviewone,
    customerupdate: customerupdate,
    customerdelete: customerdelete
};
