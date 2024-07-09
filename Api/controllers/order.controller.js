const moment = require('moment');
const Validator = require('fastest-validator');
const models = require('../models');
const sequelize = require('sequelize');

//create function to save order data
function ordersave(req, res) {
    const order = {
        orderId: req.body.orderId,
        customerId: req.body.customerId,
        productId: req.body.productId,
        orderDate: req.body.orderDate,
        quantity: req.body.quantity,
        unitPrice: req.body.unitPrice,
        status: req.body.status
    };
    //Validation schema
    const schema = {
        orderId: { type: "string", optional: false },
        customerId: { type: "string", optional: false },
        productId: { type: "string", optional: false },
        orderDate: { type: "string", optional: false }, // Changed type to "string"
        quantity: { type: "number", optional: false },
        unitPrice: { type: "number", optional: false },
        status: { type: "string", optional: false }
    };
    


    //create a validator instance
    const v = new Validator();
    const validationResponse = v.validate(order, schema);

    //check if validation failed
    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    //save order data
    models.Order.create(order).then(result => {
        res.status(201).json({
            message: "Order created successfully",
            order: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

//create function to view all orders
function orderview(req, res) {
    models.Order.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

//create function to view order for a specific table id
function orderviewone(req, res) {
    const tableId = req.params.tableId;

    //find order by table id
    models.Order.findByPk(tableId)
        .then(order => {
            if (!order) {
                return res.status(404).json({
                    message: "Order not found"
                });
            }
            res.status(200).json({
                message: "Order found",
                order: order
            });
            })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
}

//create function to update order table for a specific table id
function orderupdate(req, res) {
    const tableId = req.params.tableId;
    const updatedOrder = {
        orderId: req.body.orderId,
        customerId: req.body.customerId,
        productId: req.body.productId,
        orderDate: req.body.orderDate,
        quantity: req.body.quantity,
        unitPrice: req.body.unitPrice,
        status: req.body.status
    };

    //Validation schema
    const schema = {
        orderId: { type: "string", optional: false },
        customerId: { type: "string", optional: false },
        productId: { type: "string", optional: false },
        orderDate: { type: "string", optional: false },
        quantity: { type: "number", optional: false },
        unitPrice: { type: "number", optional: false },
        status: { type: "string", optional: false }
    };

    //validate updated order data
    const v = new Validator();
    const validationResponse = v.validate(updatedOrder, schema);

    //check validation response
    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    //update order data
    models.Order.findByPk(tableId)
        .then(order => {
            if (!order) {
                return res.status(404).json({
                    message: "Order not found"
                });
            }
            return order.update(updatedOrder)
                .then(updatedOrder => {
                    res.status(200).json({
                        message: "Order updated successfully",
                        order: updatedOrder
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

//create function to delete order data for a specific table id
function orderdelete(req, res) {
    const tableId = req.params.tableId;

    models.Order.findByPk(tableId)
        .then(order => {
            if (!order) {
                return res.status(404).json({
                    message: "Order not found"
                });
            }
            return order.destroy()
                .then(() => {
                    res.status(200).json({
                        message: "Order deleted successfully"
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

//export all functions
module.exports = {
    ordersave: ordersave,
    orderview: orderview,
    orderviewone: orderviewone,
    orderupdate: orderupdate,
    orderdelete: orderdelete
};


