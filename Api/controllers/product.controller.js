
const moment = require('moment');
const Validator = require('fastest-validator');
const models = require('../models');

// Function to save product data
function productSave(req, res) {
    const product = {
        productId: req.body.productId,
        p_name: req.body.p_name,
        available: req.body.available,
        unitPrice: req.body.unitPrice
    };

    // Validation schema
    const schema = {
        productId: { type: "string", optional: false },
        p_name: { type: "string", optional: false },
        available: { type: "number", optional: false },
        unitPrice: { type: "number", optional: false }
    };

    // Create a validator instance
    const v = new Validator();
    const validationResponse = v.validate(product, schema);

    // Check if validation failed
    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    // Save product data
    models.Product.create(product).then(result => {
        res.status(201).json({
            message: "Product created successfully",
            product: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

// Function to view all products
function productView(req, res) {
    models.Product.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

// Function to view product for a specific table id
function productViewOne(req, res) {
    const tableId = req.params.tableId;

    // Find product by table id
    models.Product.findByPk(tableId)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }
            res.status(200).json({
                message: "Product found",
                product: product
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
}

// Function to update product data for a specific table id
function productUpdate(req, res) {
    const tableId = req.params.tableId;
    const updatedProduct = {
        productId: req.body.productId,
        p_name: req.body.p_name,
        available: req.body.available,
        unitPrice: req.body.unitPrice
    };

    // Validation schema
    const schema = {
        productId: { type: "string", optional: false },
        p_name: { type: "string", optional: false },
        available: { type: "number", optional: false },
        unitPrice: { type: "number", optional: false }
    };

    // Validate updated product data
    const v = new Validator();
    const validationResponse = v.validate(updatedProduct, schema);

    // Check validation response
    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    // Update product data
    models.Product.findByPk(tableId)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }
            return product.update(updatedProduct)
                .then(updatedProduct => {
                    res.status(200).json({
                        message: "Product updated successfully",
                        product: updatedProduct
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

// Function to delete product data for a specific table id
function productDelete(req, res) {
    const tableId = req.params.tableId;

    models.Product.findByPk(tableId)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }
            return product.destroy()
                .then(() => {
                    res.status(200).json({
                        message: "Product deleted successfully"
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

// Export all functions
module.exports = {
    productSave: productSave,
    productView: productView,
    productViewOne: productViewOne,
    productUpdate: productUpdate,
    productDelete: productDelete
};




