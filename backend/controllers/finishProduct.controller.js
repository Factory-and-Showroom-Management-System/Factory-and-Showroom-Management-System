const models = require('../models');
const Validator = require('fastest-validator');

function showProduct(req, res) {
    models.FinishProduct.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}


function addProduct(req, res) {
    const finishproduct = {
        pid: req.body.pid,
        product_name: req.body.product_name,
        available_product:req.body.available_product 
        
    };

    // Validation schema
    const schema = {
        pid: { type: "string", optional: false },
        product_name: { type: "string", optional: false },
        available_product: { type: "number", optional: false }
    };

    // Create a validator instance
    const v = new Validator();
    const validationResponse = v.validate(finishproduct, schema);

    // Check if validation failed
    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    // Save roleincome
    models.FinishProduct.create(finishproduct).then(result => {
        res.status(201).json({
            message: "finishproduct created successfully",
            finishproduct: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}


function showproduct(req, res) {
    const pid = req.params.pid;

    // Find role income by table ID
    models.FinishProduct.findByPk(pid)
        .then(finishproduct => {
            if (!finishproduct) {
                return res.status(404).json({
                    message: "FinishProduct not found"
                });
            }
            res.status(200).json({
                message: "FinishProduct found",
                finishproduct: finishproduct
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
    addProduct: addProduct,
    showProduct: showProduct,
    showproduct: showproduct
}