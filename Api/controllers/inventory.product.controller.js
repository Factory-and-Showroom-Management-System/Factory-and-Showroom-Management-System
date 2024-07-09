
const moment = require('moment');
const Validator = require('fastest-validator');
const models = require('../models');


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
        available: req.body.available
    };

    // Validation schema
    const schema = {
        available: { type: "number", optional: false }

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



// Export all functions
module.exports = {
  
    productView: productView,
    productViewOne: productViewOne,
    productUpdate: productUpdate,

};