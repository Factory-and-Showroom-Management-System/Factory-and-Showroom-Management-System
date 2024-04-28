const moment = require('moment');
const Validator = require('fastest-validator');
const models = require('../models');
const { or } = require('sequelize');

//create function products table show all
function showProduct(req, res) {
    models.Product.findAll().then(result => {
        if (result) {
            res.json({
                success: true,
                message: 'Load Product',
                data: result
            });
        } else {
            res.json({
                success: false,
                message: 'No Product Found',
                data: {}
            });
        }
    });
}

//Create Function to add Product table(productId, p_name, available, unitPrice) and validation
async function addProduct(req, res) {
    const { productId, p_name, available, unitPrice } = req.body;

    const schema = {
        productId: 'string|empty:false',
        p_name: 'string|empty:false',
        available: 'number|empty:false',
        unitPrice: 'number|empty:false'
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

    models.Product.create({
        productId: productId,
        p_name: p_name,
        available: available,
        unitPrice: unitPrice
    }).then(result => {
        res.status(201).json({
            success: true,
            message: 'Product Created',
            data: result
        });
    });
}

//Create Function to update Product table(productId, p_name, available, unitPrice) and validation
async function updateProduct(req, res) {
    const productId = req.params.productId;
    const { p_name, available, unitPrice } = req.body;

    const schema = {
        p_name: 'string|empty:false',
        available: 'number|empty:false',
        unitPrice: 'number|empty:false'
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

    models.Product.findByPk(productId)
    .then(product => {
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product Not Found',
                data: {}
            });
        } else {
            product.p_name = p_name;
            product.available = available;
            product.unitPrice = unitPrice;
            product.save().then(result => {
                res.status(200).json({
                    success: true,
                    message: 'Product Updated',
                    data: result
                });
            });
        }
    });
}

//Create Function to delete Product table(productId) and validation
async function deleteProduct(req, res) {
    const productId = req.params.productId;
    models.Product.findByPk(productId)
    .then(product => {
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product Not Found',
                data: {}
            });
        } else {
            product.destroy().then(result => {
                res.status(200).json({
                    success: true,
                    message: 'Product Deleted',
                    data: result
                });
            });
        }
    });
}

module.exports = {
    showProduct,
    addProduct,
    updateProduct,
    deleteProduct
};