const moment = require('moment');
const Validator = require('fastest-validator');
const models = require('../models');

// Function to save raw material data
function rawmaterialSave(req, res) {
    const rawmaterial = {
        materialid: req.body.materialid,
        materialname: req.body.materialname,
        quantity: req.body.quantity,
        price: req.body.price
    };

    // Validation schema
    const schema = {
        materialid: { type: "string", optional: false },
        materialname: { type: "string", optional: false },
        quantity: { type: "number", optional: false },
        price: { type: "number", optional: false }
    };

    // Create a validator instance
    const v = new Validator();
    const validationResponse = v.validate(rawmaterial, schema);

    // Check if validation failed
    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    // Save raw material data
    models.Rawmaterial.create(rawmaterial).then(result => {
        res.status(201).json({
            message: "Raw material created successfully",
            rawmaterial: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

// Function to view all raw materials
function rawmaterialView(req, res) {
    models.Rawmaterial.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

// Function to view raw material for a specific table id
function rawmaterialViewOne(req, res) {
    const tableId = req.params.tableId;

    // Find raw material by table id
    models.Rawmaterial.findByPk(tableId)
        .then(rawmaterial => {
            if (!rawmaterial) {
                return res.status(404).json({
                    message: "Raw material not found"
                });
            }
            res.status(200).json({
                message: "Raw material found",
                rawmaterial: rawmaterial
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
}

// Function to update raw material data for a specific table id
function rawmaterialUpdate(req, res) {
    const tableId = req.params.tableId;
    const updatedRawmaterial = {
        materialid: req.body.materialid,
        materialname: req.body.materialname,
        quantity: req.body.quantity,
        price: req.body.price
    };

    // Validation schema
    const schema = {
        materialid: { type: "string", optional: false },
        materialname: { type: "string", optional: false },
        quantity: { type: "number", optional: false },
        price: { type: "number", optional: false }
    };

    // Validate updated raw material data
    const v = new Validator();
    const validationResponse = v.validate(updatedRawmaterial, schema);

    // Check validation response
    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    // Update raw material data
    models.Rawmaterial.findByPk(tableId)
        .then(rawmaterial => {
            if (!rawmaterial) {
                return res.status(404).json({
                    message: "Raw material not found"
                });
            }
            return rawmaterial.update(updatedRawmaterial)
                .then(updatedRawmaterial => {
                    res.status(200).json({
                        message: "Raw material updated successfully",
                        rawmaterial: updatedRawmaterial
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

// Function to delete raw material data for a specific table id
function rawmaterialDelete(req, res) {
    const tableId = req.params.tableId;

    models.Rawmaterial.findByPk(tableId)
        .then(rawmaterial => {
            if (!rawmaterial) {
                return res.status(404).json({
                    message: "Raw material not found"
                });
            }
            return rawmaterial.destroy()
                .then(() => {
                    res.status(200).json({
                        message: "Raw material deleted successfully"
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
    rawmaterialSave: rawmaterialSave,
    rawmaterialView: rawmaterialView,
    rawmaterialViewOne: rawmaterialViewOne,
    rawmaterialUpdate: rawmaterialUpdate,
    rawmaterialDelete: rawmaterialDelete
};
