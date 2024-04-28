const moment = require('moment');
const Validator = require('fastest-validator');
const models = require('../models');
const { or } = require('sequelize');


//creat function orders table show all
function showOrder(req, res) {
    models.Order.findAll().then(result => {
        if (result) {
            res.json({
                success: true,
                message: 'Load Order',
                data: result
            });
        } else {
            res.json({
                success: false,
                message: 'No Order Found',
                data: {}
            });
        }
    });
}

//Crate Function to add Order table(orderId, customerId, productId, orderDate, quantity, unitPrice, status) and validation
async function addOrder(req, res) {
    const { orderId, customerId, productId, orderDate, quantity, unitPrice, status } = req.body;

    // Convert orderDate to Date object
    const parsedOrderDate = new Date(orderDate);

    const schema = {
        orderId: 'string|empty:false',
        customerId: 'string|empty:false',
        productId: 'string|empty:false',
        orderDate: 'date|empty:false',
        quantity: 'number|empty:false',
        unitPrice: 'number|empty:false',
        status: 'string|empty:false'
    }

    const v = new Validator();
    const validationResponse = v.validate({ ...req.body, orderDate: parsedOrderDate }, schema);

    if (validationResponse !== true) {
        return res.status(400).json({
            success: false,
            message: 'Validation Failed',
            errors: validationResponse
        });
    }

    models.Order.create({
        orderId: orderId,
        customerId: customerId,
        productId: productId,
        orderDate: parsedOrderDate, // Use parsedOrderDate here
        quantity: quantity,
        unitPrice: unitPrice,
        status: status,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
    }).then(result => {
        res.status(201).json({
            success: true,
            message: 'Order Created',
            data: result
        });
    }).catch(error => {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error
        });
    });
}


//add function to update order table by specific table id
function updateOrder(req, res) {
    const orderId = req.params.orderId; // Use orderId here
    const { customerId, productId, orderDate, quantity, unitPrice, status } = req.body;

    // Convert orderDate to Date object
    const parsedOrderDate = new Date(orderDate);

    const schema = {
        customerId: 'string|empty:false',
        productId: 'string|empty:false',
        orderDate: 'date|empty:false',
        quantity: 'number|empty:false',
        unitPrice: 'number|empty:false',
        status: 'string|empty:false'
    }

    const v = new Validator();
    const validationResponse = v.validate({ ...req.body, orderDate: parsedOrderDate }, schema);

    if (validationResponse !== true) {
        return res.status(400).json({
            success: false,
            message: 'Validation Failed',
            errors: validationResponse
        });
    }

    models.Order.findByPk(orderId)
        .then(order => {
            if (!order) {
                return res.status(404).json({
                    message: 'Order Not Found',
                });
            }
            order.customerId = customerId;
            order.productId = productId;
            order.orderDate = parsedOrderDate; // Use parsedOrderDate here
            order.quantity = quantity;
            order.unitPrice = unitPrice;
            order.status = status;
            order.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');

            order.save()
                .then(result => {
                    res.status(200).json({
                        success: true,
                        message: 'Order Updated',
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




//create function to delete order by specific table id
function deleteOrder(req, res) {
    const orderId = req.params.orderId; // Use orderId here
    models.Order.findByPk(orderId)
        .then(order => {
            if (!order) {
                return res.status(404).json({
                    message: 'Order Not Found',
                });
            }
            return order.destroy()
                .then(() => {
                    res.status(200).json({
                        success: true,
                        message: 'Order Deleted',
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



//export function
module.exports = {
    showOrder: showOrder,
    addOrder: addOrder,
    updateOrder: updateOrder,
    deleteOrder: deleteOrder
}
