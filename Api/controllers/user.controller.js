const models = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Validator = require('fastest-validator');

// Create function signUp----------------------------------------------
function signUp(req, res) {
    // Create data validation schema--------
    const schema = {
        name: { type: "string", optional: false, max: "100" },
        email: { type: "email", optional: false, max: "100", domain: true }, // Use "email" type for email validation and include domain validation
        password: { type: "string", optional: false, max: "100" },
        roleId: { type: "number", optional: false, convert: true } // Changed type to "number" and added "convert: true" to ensure it's parsed as an integer
    };

    const v = new Validator();
    const validationResponse = v.validate(req.body, schema);

    if (Array.isArray(validationResponse) && validationResponse.length > 0) {
        // Construct error message from validation errors
        const errorMessage = validationResponse.map(error => error.message).join(", ");
        return res.status(400).json({
            message: 'Validation failed',
            error: errorMessage
        });
    }

    models.User.findOne({ where: { email: req.body.email } }).then(result => {
        if (result) {
            res.status(409).json({
                message: 'Email already exists'
            });
        } else {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(req.body.password, salt, function (err, hash) {
                    const user = {
                        name: req.body.name,
                        email: req.body.email,
                        password: hash,
                        roleId: parseInt(req.body.roleId) // Parse roleId to ensure it's treated as an integer
                    };

                    models.User.create(user).then(result => {
                        res.status(201).json({
                            message: 'User created successfully',
                            user: result
                        });
                    }).catch(error => {
                        res.status(500).json({
                            message: 'Something went wrong',
                            error: error
                        });
                    });
                });
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        });
    });
}

//login function
function login(req, res) {
    models.User.findOne({ where: { email: req.body.email } }).then(user => {
        if (user === null) {
            res.status(401).json({
                message: 'Invalid credentials'
            });
        } else {
            bcrypt.compare(req.body.password, user.password, function (err, result) {
                if (result) {
                    const token = jwt.sign({
                        email: user.email,
                        userId: user.id
                    }, process.env.JWT_KEY, function (err, token) {
                        res.status(200).json({
                            message: 'Authentication successful',
                            token: token
                        });
                    });
                } else {
                    res.status(401).json({
                        message: 'Invalid credentials'
                    });
                }
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        });
    });
}

module.exports = {
    signUp: signUp,
    login: login
};
