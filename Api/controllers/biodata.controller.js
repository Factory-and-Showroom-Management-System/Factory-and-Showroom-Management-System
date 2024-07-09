const models = require('../models');
const Validator = require('fastest-validator');
const { updateOrCreateAttendance } = require('./attendance.controller');

// Create function (userId:integer,nameWini:string,nameWFull:string,birthdate:date,age:integer,roleId:integer,gender:string,address:string,email:string,bankNumber:integer,phoneNumber:string,imgSrc:string) save BioDataSave and validation data
function BioDataSave(req, res) {
    const {
        userId,
        nameWini,
        nameWFull,
        birthdate,
        roleName, // This is roleName instead of roleId
        gender,
        address,
        email,
        bankNumber,
        phoneNumber,
        imgSrc
    } = req.body;

    if (!userId || !nameWini || !nameWFull || !birthdate || !roleName || !gender || !address || !email || !bankNumber || !phoneNumber || !imgSrc) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    // Validation schema
    const schema = {
        userId: {type: "number", optional: false, max: "100", unique: true },
        nameWini: {type: "string", optional: false, max: "100" },
        nameWFull: {type: "string", optional: false, max: "200" },
        birthdate: {type: "string", optional: false }, // Change type to string
        roleName: {type: "string", optional: false, max: "100" },
        gender: {type: "string", optional: false, max: "100" },
        address: {type: "string", optional: false, max: "300" },
        phoneNumber: {type: "string", optional: false, max: "10" },
        bankNumber: {type: "string", optional: false, max: "15"},
        imgSrc: {type: "string", optional: true, max: "300" }
    };

    // Create a validator instance
    const v = new Validator();
    const validationResponse = v.validate(req.body, schema);

    // Check if validation failed
    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    // Find the role based on the roleName
    models.Role.findOne({
        where: { roleName: roleName }
    }).then(role => {
        if (!role) {
            return res.status(404).json({
                message: "Role not found"
            });
        }

        const age = calculateAge(req.body.birthdate);

        // Now we have the roleId, proceed to save BioData
        models.BioData.create({
            userId: userId,
            nameWini: nameWini,
            nameWFull: nameWFull,
            birthdate: birthdate,
            age: calculateAge(req.body.birthdate), // Automatically generate age
            roleId: role.id, // Use the found roleId
            gender: gender,
            address: address,
            email: email,
            phoneNumber: phoneNumber,
            bankNumber: bankNumber,
            imgSrc: imgSrc
        }).then(result => {
            // Update or create attendance
            return updateOrCreateAttendance(userId, roleName, nameWini).then(() => {
                res.status(201).json({
                    message: "BioData saved successfully",
                    bioData: result
                });
            });
        }).catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
        
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });   
}


// Function to calculate age from birthdate
function calculateAge(birthdate) {
    const birthYear = new Date(birthdate).getFullYear();
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
}



// Create Function Show BioDataSave
function BioDataShow(req, res) {
    models.BioData.findAll({
        include: [
            {
                model: models.Role,
                as: 'role',
                attributes: ['roleName'],
            }]
             // Include Role model to get roleName
    }).then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

// Create function to show userId biodata table's data
function biodataShowId(req, res) {
    models.BioData.findAll({
        where: {
            userId: req.params.userId
        },
        //get role by roleId
        include: [
        {
            model: models.Role,
            as: 'role',
            attributes: ['roleName'],
        }]
    }).then(result => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                message: "User not found"
            })
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

// Create function to destroy BioData table id
function BioDataDelete(req, res) {
    const tableId = req.params.id;

    models.BioData.findByPk(tableId).then(result => {
        if (!result) {
            return res.status(404).json({
                message: "BioData not found"
            });
        }
        result.destroy().then(() => {
            res.status(200).json({
                message: "BioData deleted successfully"
            });
        }).catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

// Create function to Update BioData table
function BioDataUpdate(req, res) {
    const tableId = req.params.id;
    const {
        userId,
        nameWini,
        nameWFull,
        birthdate,
        roleName,
        gender,
        address,
        email,
        bankNumber,
        phoneNumber,
        imgSrc
    } = req.body;

    // Validation schema
    const schema = {
        userId: { type: "number", optional: false, max: "100", unique: true },
        nameWini: { type: "string", optional: false, max: "100" },
        nameWFull: { type: "string", optional: false, max: "200" },
        birthdate: { type: "string", optional: false }, // Change type to string
        roleName: { type: "string", optional: false, max: "100" },
        gender: { type: "string", optional: false, max: "100" },
        address: { type: "string", optional: false, max: "300" },
        bankNumber: {type: "string", optional: false, max: "15"},
        phoneNumber: { type: "string", optional: false, max: "10" },
        imgSrc: { type: "string", optional: true, max: "300" }
    };

    // Create a validator instance
    const v = new Validator();
    const validationResponse = v.validate(req.body, schema);

    // Check if validation failed
    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    

    models.Role.findOne({
        where: { roleName: roleName }
    }).then(role => {
        if (!role) {
            return res.status(404).json({
                message: "Role not found"
            });
        }

        // Now we have the roleId, proceed to update BioData
        models.BioData.findByPk(tableId).then(result => {
            if (!result) {
                return res.status(404).json({
                    message: "BioData not found"
                });
            }

            result.userId = userId;
            result.nameWini = nameWini;
            result.nameWFull = nameWFull;
            result.birthdate = birthdate;
            result.age = calculateAge(req.body.birthdate);
            result.roleId = role.id; // Update roleId with the found roleId
            result.gender = gender;
            result.address = address;
            result.email = email;
            result.bankNumber = bankNumber;
            result.phoneNumber = phoneNumber;
            result.imgSrc = imgSrc;

            result.save().then(updatedBioDataRecord => {
                res.status(200).json({
                    message: "BioData updated successfully",
                    bioData: updatedBioDataRecord
                });
            }).catch(error => {
                res.status(500).json({
                    message: "Something went wrong",
                    error: error
                });
            });
        }).catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

function findRoleIDbyRoleName(req, res) {
    const roleName = req.params.roleName;
    models.Role.findOne({
        where: { roleName: roleName }
    }).then(role => {
        if (!role) {
            return res.status(404).json({
                message: "Role not found"
            });
        }
        res.status(200).json({
            message: "Role found",
            role: role
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });

}



// Export functions
module.exports = {
    BioDataSave: BioDataSave,
    BioDataShow: BioDataShow,
    biodataShowId: biodataShowId,
    BioDataUpdate: BioDataUpdate,
    BioDataDelete: BioDataDelete,
    findRoleIDbyRoleName: findRoleIDbyRoleName
};
