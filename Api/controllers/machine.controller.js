const moment = require('moment');
const Validator = require('fastest-validator');
const models = require('../models');

// Function to save machine data
function machinesave(req, res) {
    const machine = {
        machineId: req.body.machineId,
        inputp: req.body.inputp,
        outputp: req.body.outputp,
        dateIn: req.body.dateIn,
        timeIn: req.body.timeIn
    };

    // Validation schema
    const schema = {
        machineId: { type: "string", optional: false },
        inputp: { type: "number", optional: false },
        outputp: { type: "number", optional: false },
        dateIn: { type: "string", optional: false },
        timeIn: { type: "string", optional: false }
    };

    // Create a validator instance
    const v = new Validator();
    const validationResponse = v.validate(machine, schema);

    // Check if validation failed
    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    // Save machine data
    models.Machine.create(machine)
        .then(result => {
            res.status(201).json({
                message: "Machine created successfully",
                machine: result
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
}

// Function to view all machines
function machineview(req, res) {
    models.Machine.findAll()
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

// Function to view machine by ID
function machineviewone(req, res) {
    const tableId = req.params.tableId;

    models.Machine.findByPk(tableId)
        .then(machine => {
            if (!machine) {
                return res.status(404).json({
                    message: "Machine not found"
                });
            }
            res.status(200).json({
                message: "Machine found",
                machine: machine
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
}

// Function to update machine by ID
function machineupdate(req, res) {
    const tableId = req.params.tableId;
    const updatedMachine = {
        machineId: req.body.machineId,
        inputp: req.body.inputp,
        outputp: req.body.outputp,
        dateIn: req.body.dateIn,
        timeIn: req.body.timeIn
    };

    // Validation schema
    const schema = {
        machineId: { type: "string", optional: false },
        inputp: { type: "number", optional: false },
        outputp: { type: "number", optional: false },
        dateIn: { type: "string", optional: false },
        timeIn: { type: "string", optional: false }
    };

    // Validate updated machine data
    const v = new Validator();
    const validationResponse = v.validate(updatedMachine, schema);

    // Check validation response
    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    // Update machine data
    models.Machine.findByPk(tableId)
        .then(machine => {
            if (!machine) {
                return res.status(404).json({
                    message: "Machine not found"
                });
            }
            return machine.update(updatedMachine)
                .then(updatedMachine => {
                    res.status(200).json({
                        message: "Machine updated successfully",
                        machine: updatedMachine
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

// Function to delete machine by ID
function machinedelete(req, res) {
    const tableId = req.params.tableId;

    models.Machine.findByPk(tableId)
        .then(machine => {
            if (!machine) {
                return res.status(404).json({
                    message: "Machine not found"
                });
            }
            return machine.destroy()
                .then(() => {
                    res.status(200).json({
                        message: "Machine deleted successfully"
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
    machinesave: machinesave,
    machineview: machineview,
    machineviewone: machineviewone,
    machineupdate: machineupdate,
    machinedelete: machinedelete
};
