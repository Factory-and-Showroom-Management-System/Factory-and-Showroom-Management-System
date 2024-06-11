const moment = require('moment');
const Validator = require('fastest-validator');
const models = require('../models');



//creat function to save roleincome data
function rsave(req, res) {
    const roleincome = {
        role: req.body.role,
        dateIncome: req.body.dateIncome
    };

    // Validation schema
    const schema = {
        role: { type: "string", optional: false, max: 100 },
        dateIncome: { type: "number", optional: false }
    };

    // Create a validator instance
    const v = new Validator();
    const validationResponse = v.validate(roleincome, schema);

    // Check if validation failed
    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    // Save roleincome
    models.RoleIncome.create(roleincome).then(result => {
        res.status(201).json({
            message: "RoleIncome created successfully",
            roleincome: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

//creat function to show all data
function rshow(req, res) {
    models.RoleIncome.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

// Create function to show role income for a specific table ID
function ridshow(req, res) {
    const tableId = req.params.tableId;

    // Find role income by table ID
    models.RoleIncome.findByPk(tableId)
        .then(roleincome => {
            if (!roleincome) {
                return res.status(404).json({
                    message: "RoleIncome not found"
                });
            }
            res.status(200).json({
                message: "RoleIncome found",
                roleincome: roleincome
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
}


// Create function to update role income table for a specific table ID
function rupdate(req, res) {
    const tableId = req.params.tableId;
    const updatedRoleIncome = {
        role: req.body.role,
        dateIncome: req.body.dateIncome
    };

    // Validation schema for update
    const schema = {
        role: { type: "string", optional: false, max: 100 },
        dateIncome: { type: "number", optional: false }
    };

    // Validate updated data
    const v = new Validator();
    const validationResponse = v.validate(updatedRoleIncome, schema);

    // Check validation result
    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    // Update role income
    models.RoleIncome.findByPk(tableId)
        .then(roleincome => {
            if (!roleincome) {
                return res.status(404).json({
                    message: "RoleIncome not found"
                });
            }
            // Update role income
            return roleincome.update(updatedRoleIncome)
                .then(updatedRoleIncome => {
                    res.status(200).json({
                        message: "RoleIncome updated successfully",
                        roleincome: updatedRoleIncome
                    });
                })
                .catch(error => {
                    res.status(500).json({
                        message: "Failed to update RoleIncome",
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

// Create function to destroy role income for a specific table ID
function rdestroy(req, res) {
    const tableId = req.params.tableId;

    // Find role income by table ID and destroy it
    models.RoleIncome.findByPk(tableId)
        .then(roleincome => {
            if (!roleincome) {
                return res.status(404).json({
                    message: "RoleIncome not found"
                });
            }
            // Destroy role income
            return roleincome.destroy()
                .then(() => {
                    res.status(200).json({
                        message: "RoleIncome deleted successfully"
                    });
                })
                .catch(error => {
                    res.status(500).json({
                        message: "Failed to delete RoleIncome",
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












//current month calutae basicSalary------------------------------------------------------------------------------------------
// async function bssalaryAll(req, res) {
//     try {
//         // Get the start and end dates of the current month
//         const startDate = moment().startOf('month');
//         const endDate = moment().endOf('month');

//         // Fetch attendance records for the current month
//         const attendanceRecords = await models.Attendance.findAll({
//             where: {
//                 dateIn: {
//                     [models.Sequelize.Op.between]: [startDate, endDate]
//                 }
//             }
//         });

//         if (!attendanceRecords || attendanceRecords.length === 0) {
//             return res.status(404).json({ message: "No attendance records found for the current month" });
//         }

//         // Iterate through attendance records to calculate attenCount for each userId
//         const attenCountMap = {};
//         for (const attendanceRecord of attendanceRecords) {
//             if (!attenCountMap[attendanceRecord.userId]) {
//                 attenCountMap[attendanceRecord.userId] = 1;
//             } else {
//                 attenCountMap[attendanceRecord.userId]++;
//             }
//         }

//         // Iterate through attenCountMap to update or create basic salary records
//         const basicSalaries = [];
//         for (const userId in attenCountMap) {
//             if (attenCountMap.hasOwnProperty(userId)) {
//                 const attenCount = attenCountMap[userId];

                

//                 // Fetch existing basic salary record for the userId
//                 let basicSalary = await models.BasicSalary.findOne({ where: { userId: userId } });
                
//                 // Fetch role income record which includes dateIncome
//                 const bioData = await models.BioData.findOne({ where: { userId: userId } });
                

//                 if (!bioData) {
//                     continue; // Skip if bioData not found
//                 }
//                 const nameWini = bioData.nameWini;
//                 const roleId = bioData.roleId;
//                 const roleIncome = await models.RoleIncome.findOne({ where: { id: roleId } });
//                 if (!roleIncome) {
//                     continue; // Skip if role not found
//                 }

//                 if (!basicSalary) {
//                     // If no existing record found, create a new one
//                     basicSalary = await models.BasicSalary.create({
//                         userId: userId,
//                         name: nameWini, // Use nameWini from BioData table
//                         roleId: roleId,
//                         attenCount: attenCount,
//                         dateIncome: roleIncome.dateIncome,
//                         basicSalary: attenCount * roleIncome.dateIncome
//                     });
//                 } else {
//                     // If existing record found, update it
//                     basicSalary.attenCount = attenCount;
//                     basicSalary.dateIncome = roleIncome.dateIncome;  // Update dateIncome to the latest value
//                     basicSalary.basicSalary = attenCount * roleIncome.dateIncome;  // Recalculate basicSalary using latest dateIncome
//                     basicSalary.name = nameWini; // Update name field with nameWini from BioData table
//                     await basicSalary.save();
//                 }

//                 basicSalaries.push(basicSalary);
//             }
//         }

//         res.status(200).json({
//             message: "BasicSalaries updated/created successfully",
//             salaries: basicSalaries
//         });
//     } catch (error) {
//         console.error("Error in bssalaryAll:", error);
//         res.status(500).json({
//             message: "Something went wrong",
//             error: error.message
//         });
//     }
// }

async function bssalaryAll(req, res) {
    try {
        const startDate = moment().startOf('month');
        const endDate = moment().endOf('month');

        const attendanceRecords = await models.Attendance.findAll({
            where: {
                dateIn: {
                    [models.Sequelize.Op.between]: [startDate, endDate]
                }
            }
        });

        // Fetch all unique userIds from BioData
        const allBioData = await models.BioData.findAll();
        const allUserIds = allBioData.map(bioData => bioData.userId);

        const attenCountMap = {};
        for (const userId of allUserIds) {
            attenCountMap[userId] = 0; // Initialize with 0
        }

        for (const attendanceRecord of attendanceRecords) {
            if (attenCountMap.hasOwnProperty(attendanceRecord.userId)) {
                attenCountMap[attendanceRecord.userId]++;
            }
        }

        const basicSalaries = [];
        for (const userId in attenCountMap) {
            if (attenCountMap.hasOwnProperty(userId)) {
                const attenCount = attenCountMap[userId];

                let basicSalary = await models.BasicSalary.findOne({ where: { userId: userId } });

                const bioData = await models.BioData.findOne({ where: { userId: userId } });

                if (!bioData) {
                    continue;
                }
                const nameWini = bioData.nameWini;
                const roleId = bioData.roleId;
                const roleIncome = await models.RoleIncome.findOne({ where: { id: roleId } });
                if (!roleIncome) {
                    continue;
                }

                if (!basicSalary) {
                    basicSalary = await models.BasicSalary.create({
                        userId: userId,
                        name: nameWini,
                        roleId: roleId,
                        attenCount: attenCount,
                        dateIncome: roleIncome.dateIncome,
                        basicSalary: attenCount * roleIncome.dateIncome
                    });
                } else {
                    basicSalary.attenCount = attenCount;
                    basicSalary.dateIncome = roleIncome.dateIncome;
                    basicSalary.basicSalary = attenCount * roleIncome.dateIncome;
                    basicSalary.name = nameWini;
                    await basicSalary.save();
                }

                basicSalaries.push(basicSalary);
            }
        }

        res.status(200).json({
            message: "BasicSalaries updated/created successfully",
            salaries: basicSalaries
        });
    } catch (error) {
        console.error("Error in bssalaryAll:", error);
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}













//creat function basicSalary table show --------
function bsshow(req, res) {
    models.BasicSalary.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}


//creat function to save BudgetedAllowance data (current date with Time) -------------------------------------------------
function basave(req, res) {
    let currentDate = new Date();
    let userDate = new Date(req.body.baDate);
    userDate.setHours(currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds(), currentDate.getMilliseconds());

    const budgetedAllowance = {
        baDate: userDate, // User-provided date with current server time
        baValue: req.body.baValue
    };

    const schema = {
        baDate: { type: "date", optional: false },
        baValue: { type: "number", optional: false }
    };

    const v = new Validator();
    const validationResponse = v.validate(budgetedAllowance, schema);

    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    models.BudgetedAllowance.create(budgetedAllowance).then(result => {
        res.status(201).json({
            message: "BudgetedAllowance created successfully",
            budgetedAllowance: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}


//creat function to show BudgetedAllowance data -------------------------------------------------
function bashow(req, res) {
    models.BudgetedAllowance.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });

    });
}

//creat function to show BudgetedAllowance data for id -------------------------------------------------
function baIdshow(req, res) {
    const tableId = req.params.tableId;

    models.BudgetedAllowance.findByPk(tableId)
        .then(budgetedallowance => {
            if (!budgetedallowance) {
                return res.status(404).json({
                    message: "BudgetedAllowance not found"
                });
            }
            res.status(200).json({
                message: "BudgetedAllowance found",
                budgetedAllowance: budgetedallowance
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
}



//creat function to  BudgetedAllowance data update data
function baupdate(req, res) {
    const tableId = req.params.tableId;

    // Get the current date and time
    let currentDate = new Date();
    // Parse the user-provided date and set the current time
    let userDate = new Date(req.body.baDate);
    userDate.setHours(currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds(), currentDate.getMilliseconds());

    // Prepare the updated allowance object with the user's date and the current time
    const updatedBudgetedAllowance = {
        baDate: userDate, // This now includes the date provided by the user but with current time
        baValue: req.body.baValue
    };

    // Validation schema for update
    const schema = {
        baDate: { type: "date", optional: false },
        baValue: { type: "number", optional: false }
    };

    // Validate updated data
    const v = new Validator();
    const validationResponse = v.validate(updatedBudgetedAllowance, schema);

    // Check validation result
    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    // Update BudgetedAllowance in the database
    models.BudgetedAllowance.findByPk(tableId)
        .then(budgetedallowance => {
            if (!budgetedallowance) {
                return res.status(404).json({
                    message: "BudgetedAllowance not found"
                });
            }
            // Perform the update with the modified date
            return budgetedallowance.update(updatedBudgetedAllowance)
                .then(() => {
                    res.status(200).json({
                        message: "BudgetedAllowance updated successfully",
                        budgetedAllowance: updatedBudgetedAllowance
                    });
                })
                .catch(error => {
                    res.status(500).json({
                        message: "Failed to update BudgetedAllowance",
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


//creat function to  BudgetedAllowance data delete data
function badelete(req, res) {
    const tableId = req.params.tableId;

    // Find BudgetedAllowance by table ID and destroy it
    models.BudgetedAllowance.findByPk(tableId)
        .then(budgetedallowance => {
            if (!budgetedallowance) {
                return res.status(404).json({
                    message: "BudgetedAllowance not found"
                });
            }
            // Destroy BudgetedAllowance
            return budgetedallowance.destroy()
                .then(() => {
                    res.status(200).json({
                        message: "BudgetedAllowance deleted successfully"
                    });
                })
                .catch(error => {
                    res.status(500).json({
                        message: "Failed to delete BudgetedAllowance",
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

//creat function auto add to data Earning table BasicSalary(userId,name, basicSalary) and  BudgetedAllowance(baValue:latest date) data
async function earningcal(req, res) {
    try {
        // Fetch data to userId, name, and basicSalary from BasicSalary table
        const basicSalaries = await models.BasicSalary.findAll();
        if (!basicSalaries || basicSalaries.length === 0) {
            return res.status(404).json({ message: "No basic salary records found" });
        }

        // Fetch the latest BudgetedAllowance record
        const budgetedAllowance = await models.BudgetedAllowance.findOne({
            order: [['baDate', 'DESC']]
        });
        if (!budgetedAllowance) {
            return res.status(404).json({ message: "No budgeted allowance record found" });
        }

        // Iterate through basicSalaries to update or create earning records
        const earnings = [];
        for (const basicSalary of basicSalaries) {
            // Fetch existing earning record for the userId
            let earning = await models.Earning.findOne({ where: { userId: basicSalary.userId } });

            if (!earning) {
                // If no existing record found, create a new one
                earning = await models.Earning.create({
                    userId: basicSalary.userId,
                    name: basicSalary.name,
                    basicSalary: basicSalary.basicSalary,
                    baValue: budgetedAllowance.baValue,
                    totalEarning: basicSalary.basicSalary + budgetedAllowance.baValue
                });
            } else {
                // If existing record found, update it
                earning.basicSalary = basicSalary.basicSalary; // Update basicSalary
                earning.baValue = budgetedAllowance.baValue;
                earning.totalEarning = basicSalary.basicSalary + budgetedAllowance.baValue;
                await earning.save();
            }

            earnings.push(earning);
        }

        res.status(200).json({
            message: "Earnings updated/created successfully",
            earnings: earnings
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}






//creat function show Earning Table data
function earningShow(req, res) {
    models.Earning.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}





// //creat function to auto add to data UserTotalLoan table use to User(userId, name) data
async function SaveUserTotalLoan(req, res) {
    try {
        const bioDatas = await models.BioData.findAll();
        if (!bioDatas || bioDatas.length === 0) {
            return res.status(404).json({ message: "No BioData found" });
        }

        // Iterate through bioDatas to update or create user total loan records
        const userTotalLoans = [];
        for (const bioData of bioDatas) {
            // Fetch existing user total loan record for the userId
            let userTotalLoan = await models.UserTotalLoan.findOne({ where: { userId: bioData.userId } });

            if (!userTotalLoan) {
                // If no existing record found, create a new one
                userTotalLoan = await models.UserTotalLoan.create({
                    userId: bioData.userId,
                    name: bioData.nameWini,
                    loanDate: null,
                    loanAmount: 0,
                    toBePaid: 0,
                    loanRatePresentage: 0,
                    loanDuration: null
                });
            } else {
                // If an existing record is found, update it
                userTotalLoan.name = bioData.nameWini; // Update name if it has changed
                await userTotalLoan.save(); // Save the changes
            }

            userTotalLoans.push(userTotalLoan);
        }

        res.status(200).json({
            message: "UserTotalLoans updated/created successfully",
            userTotalLoans: userTotalLoans
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}


//creat function to add to data UserTotalLoan
function AddUserTotalLoan(req, res) {
    const userTotalLoan = {
        userId: req.body.userId,
        name: req.body.name,
        loanDate: moment(req.body.loanDate).toDate(), // Convert date string to Date object
        loanAmount: req.body.loanAmount,
        toBePaid: req.body.toBePaid,
        loanRatePresentage: req.body.loanRatePresentage,
        loanDuration: req.body.loanDuration
    };

    // Validation schema
    const schema = {
        userId: { type: "number", optional: false },
        name: { type: "string", optional: false },
        loanDate: { type: "date", optional: true },
        loanAmount: { type: "number", optional: false },
        toBePaid: { type: "number", optional: false },
        loanRatePresentage: { type: "number", optional: false },
        loanDuration: { type: "string", optional: true }
    };

    // Create a validator instance
    const v = new Validator();
    const validationResponse = v.validate(userTotalLoan, schema);

    // Check if validation failed
    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    // Save UserTotalLoan
    models.UserTotalLoan.create(userTotalLoan).then(result => {
        res.status(201).json({
            message: "UserTotalLoan created successfully",
            userTotalLoan: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

//creat function to show UserTotalLoan data
function ShowUserTotalLoan(req, res) {
    models.UserTotalLoan.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

//creat function to show UserTotalLoan data by id
function ShowUserTotalLoanById(req, res) {
    const tableId = req.params.tableId;

    // Find UserTotalLoan by table ID
    models.UserTotalLoan.findByPk(tableId)
        .then(userTotalLoan => {
            if (!userTotalLoan) {
                return res.status(404).json({
                    message: "UserTotalLoan not found"
                });
            }
            res.status(200).json({
                message: "UserTotalLoan found",
                userTotalLoan: userTotalLoan
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
}




function UpdateUserTotalLoan(req, res) {
    const tableId = req.params.tableId;
    const updatedUserTotalLoan = {
        userId: req.body.userId,
        name: req.body.name,
        loanDate: new Date(req.body.loanDate), // Convert loanDate string to Date object
        loanAmount: req.body.loanAmount,
        toBePaid: req.body.toBePaid,
        loanRatePresentage: req.body.loanRatePresentage,
        loanDuration: req.body.loanDuration
    };

    // Validation schema for update
    const schema = {
        userId: { type: "number", optional: false },
        name: { type: "string", optional: false },
        loanDate: { type: "date", optional: true },
        loanAmount: { type: "number", optional: false },
        toBePaid: { type: "number", optional: false },
        loanRatePresentage: { type: "number", optional: false },
        loanDuration: { type: "string", optional: true }
    };

    // Validate updated data
    const v = new Validator();
    const validationResponse = v.validate(updatedUserTotalLoan, schema);

    // Check validation result
    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    // Update UserTotalLoan
    models.UserTotalLoan.findByPk(tableId)
        .then(userTotalLoan => {
            if (!userTotalLoan) {
                return res.status(404).json({
                    message: "UserTotalLoan not found"
                });
            }
            // Update UserTotalLoan
            return userTotalLoan.update(updatedUserTotalLoan)
                .then(updatedUserTotalLoan => {
                    res.status(200).json({
                        message: "UserTotalLoan updated successfully",
                        userTotalLoan: updatedUserTotalLoan
                    });
                })
                .catch(error => {
                    res.status(500).json({
                        message: "Failed to update UserTotalLoan",
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

//creat function to delete UserTotalLoan data
function DeleteUserTotalLoan(req, res) {
    const tableId = req.params.tableId;

    // Find UserTotalLoan by table ID and destroy it
    models.UserTotalLoan.findByPk(tableId)
        .then(userTotalLoan => {
            if (!userTotalLoan) {
                return res.status(404).json({
                    message: "UserTotalLoan not found"
                });
            }
            // Destroy UserTotalLoan
            return userTotalLoan.destroy()
                .then(() => {
                    res.status(200).json({
                        message: "UserTotalLoan deleted successfully"
                    });
                })
                .catch(error => {
                    res.status(500).json({
                        message: "Failed to delete UserTotalLoan",
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





//creat function to calclute userMonthLons Table ------------------------------------------------------------------------------------------
const { Op } = require('sequelize');
const usermonrhloan = require('../models/usermonrhloan');
const roleotincome = require('../models/roleotincome');
async function UserMonthLoan(req, res) {
    try {
        // Get the current date
        const currentDate = moment().startOf('month').add(1, 'day'); // Set the day of the month to 1 and add a day

        // Fetch data from UserTotalLoan table
        const userTotalLoans = await models.UserTotalLoan.findAll();
        if (!userTotalLoans || userTotalLoans.length === 0) {
            return res.status(404).json({ message: "No user total loan records found" });
        }


        // Iterate through userTotalLoans to update or create user month loan records
        const userMonthLoans = [];
        for (const userTotalLoan of userTotalLoans) {
            // Fetch existing user month loan record for the userId
            let userMonthLoan = await models.UserMonrhLoan.findOne({ where: { userId: userTotalLoan.userId } });

            //check to userMonthLoan table currentDate is table not data
            if (!userMonthLoan) {
                // If no existing record found, create a new one
                userMonthLoan = await models.UserMonrhLoan.create({
                    userId: userTotalLoan.userId,
                    name: userTotalLoan.name,
                    currentDate: userTotalLoan.loanDate, // Set currentDate to "2024-04-01"
                    monthLoan: 0
                });
            }
            
            if (userTotalLoan.toBePaid != 0) {

                if (!moment(userMonthLoan.currentDate).isSame(currentDate, 'month')) {


                    // Check if the currentDate value of the UserMonrhLoan table (currentDate, monthLoan) is unequal to the current year and month
                    if ((!moment(userMonthLoan.currentDate).isSame(currentDate, 'month')) && (userMonthLoan.monthLoan === 0)) {

                        if ((!moment(userMonthLoan.currentDate).isSame(currentDate, 'month')) && (userMonthLoan.monthLoan != 0)) {
                            const y = userTotalLoan.toBePaid;
                            const x = userTotalLoan.loanRatePresentage / 100 * userTotalLoan.loanAmount;
                            const xxx = y - x;

                            console.log(xxx);
                            userTotalLoan.toBePaid = xxx;
                            await userTotalLoan.save(); // Save the changes

                        } else {
                            if ((!moment(userMonthLoan.currentDate).isSame(currentDate, 'month')) && (userMonthLoan.monthLoan === 0)) {
                                // Calculate the monthLoan
                                if (moment(userTotalLoan.loanDate).isSame(currentDate, 'month')) {

                                } else {

                                    if (userTotalLoan.toBePaid != 0) {
                                        const y = userTotalLoan.toBePaid;
                                        const x = userTotalLoan.loanRatePresentage / 100 * userTotalLoan.loanAmount;
                                        const xxx = y - x;

                                        console.log(xxx);
                                        userTotalLoan.toBePaid = xxx;
                                        await userTotalLoan.save(); // Save the changes


                                    } else {

                                    }

                                }
                            } if ((!moment(userMonthLoan.currentDate).isSame(currentDate, 'month')) && (userMonthLoan.monthLoan != 0)) {
                                // Calculate the monthLoan
                                if (moment(userTotalLoan.loanDate).isSame(currentDate, 'month')) {

                                } else {

                                    const y = userTotalLoan.toBePaid;
                                    const x = userTotalLoan.loanRatePresentage / 100 * userTotalLoan.loanAmount;
                                    const xxx = y - x;

                                    console.log(xxx);
                                    userTotalLoan.toBePaid = xxx;
                                    await userTotalLoan.save(); // Save the changes
                                }
                            }
                        }

                    } else {
                        ((!moment(userMonthLoan.currentDate).isSame(currentDate, 'month')) && (userMonthLoan.monthLoan != 0))
                        // Calculate the monthLoan
                        if (moment(userTotalLoan.loanDate).isSame(currentDate, 'month')) {

                        } else {

                            if (!moment(userMonthLoan.currentDate).isSame(currentDate, 'month')) {

                                if (moment(userTotalLoan.loanDate).isSame(currentDate, 'month')) {

                                } else {


                                    const y = userTotalLoan.toBePaid;
                                    const x = userTotalLoan.loanRatePresentage / 100 * userTotalLoan.loanAmount;
                                    const xxx = y - x;

                                    console.log(xxx);
                                    userTotalLoan.toBePaid = xxx;
                                    await userTotalLoan.save(); // Save the changes
                                }


                            }

                        }
                    }
                    if ((!moment(userMonthLoan.currentDate).isSame(currentDate, 'month')) && (userMonthLoan.monthLoan === 0)) {
                        // Calculate the monthLoan
                        if (moment(userTotalLoan.loanDate).isSame(currentDate, 'month')) {

                        } else {

                            if (userTotalLoan.toBePaid === 0) {
                                console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
                                const y = userTotalLoan.toBePaid;
                                const x = userTotalLoan.loanRatePresentage / 100 * userTotalLoan.loanAmount;
                                const xxx = y - x;

                                console.log(xxx);
                                userTotalLoan.toBePaid = xxx;
                                await userTotalLoan.save(); // Save the changes


                            } else {

                            }
                        }
                    }



                    if (!userMonthLoan) {
                        // If no existing record found, create a new one
                        userMonthLoan = await models.UserMonrhLoan.create({
                            userId: userTotalLoan.userId,
                            name: userTotalLoan.name,
                            currentDate: currentDate.toDate(), // Set currentDate to "2024-04-01"
                            monthLoan: 0
                        });
                    } else {
                        // If an existing record is found, update it
                        userMonthLoan.currentDate = currentDate.toDate();
                        await userMonthLoan.save(); // Save the changes

                    }

                    // Calculate the monthLoan
                    if (moment(userTotalLoan.loanDate).isSame(currentDate, 'month')) {
                        userMonthLoan.monthLoan = 0;
                    } else {
                        userMonthLoan.monthLoan = userTotalLoan.loanRatePresentage / 100 * userTotalLoan.loanAmount;
                    }

                    await userMonthLoan.save(); // Save the changes
                    userMonthLoans.push(userMonthLoan);

                }




            }



            if (!moment(userMonthLoan.currentDate).isSame(currentDate, 'month')) {

                if (userMonthLoan.monthLoan != 0) {

                    userMonthLoan.monthLoan = 0;
                    await userTotalLoan.save(); // Save the changes

                    // If an existing record is found, update it
                    userMonthLoan.currentDate = currentDate.toDate();
                    await userMonthLoan.save(); // Save the changes

                }
            }

        }

        res.status(200).json({
            message: "UserMonthLoans updated/created successfully",
            userMonthLoans: userMonthLoans
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}



//creat function to show UserMonthLoan data
function UserMonthLoanShow(req, res) {
    models.UserMonrhLoan.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}







async function MonthEpfEtf(req, res) {
    try {
        // Fetch data from BasicSalary table
        const basicSalaries = await models.BasicSalary.findAll();
        if (!basicSalaries || basicSalaries.length === 0) {
            return res.status(404).json({ message: "No basic salary records found" });
        }

        // Iterate through basic salaries to update or create month epf etf records
        const monthEpfEtfs = [];
        for (const basicSalary of basicSalaries) {
            // Fetch existing month epf etf record for the userId
            let monthEpfEtf = await models.MonthEpfEtf.findOne({ where: { userId: basicSalary.userId } });

            if (!monthEpfEtf) {
                // If no existing record found, create a new one
                monthEpfEtf = await models.MonthEpfEtf.create({
                    userId: basicSalary.userId,
                    name: basicSalary.name,
                    basicSalary: 0,
                    epf8: 0,
                    epf12: 0,
                    totalEpf8Epf12: 0,
                    etf3: 0
                });
            } else {
                // If an existing record is found, update it
                monthEpfEtf.name = basicSalary.name; // Update name if it has changed
                await monthEpfEtf.save(); // Save the changes
            }

            // Update the basicSalary and calculate the epf8, epf12, totalEpf8Epf12, and etf3
            monthEpfEtf.basicSalary = basicSalary.basicSalary;
            monthEpfEtf.epf8 = basicSalary.basicSalary * 8 / 100;
            monthEpfEtf.epf12 = basicSalary.basicSalary * 12 / 100;
            monthEpfEtf.totalEpf8Epf12 = monthEpfEtf.epf8 + monthEpfEtf.epf12;
            monthEpfEtf.etf3 = basicSalary.basicSalary * 3 / 100;
            await monthEpfEtf.save(); // Save the changes

            monthEpfEtfs.push(monthEpfEtf);
        }

        res.status(200).json({
            message: "MonthEpfEtfs updated/created successfully",
            monthEpfEtfs: monthEpfEtfs
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}









//creat function to show MonthEpfEtf data
function MonthEpfEtfShow(req, res) {
    models.MonthEpfEtf.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}


//creat function Fetch and auto add to data Deduction table BasicSalary table (userId,name) and  UserMonrhLoan table(monthLoan) and , epf8(MonthEpfEtf table : epf8) and totalDeduction:(monthLoan+epf) data
async function Deduction(req, res) {
    try {
        // Fetch data from BasicSalary table
        const basicSalaries = await models.BasicSalary.findAll();
        if (!basicSalaries || basicSalaries.length === 0) {
            return res.status(404).json({ message: "No basic salary records found" });
        }

        // Fetch data from UserMonrhLoan table
        const userMonthLoans = await models.UserMonrhLoan.findAll();
        if (!userMonthLoans || userMonthLoans.length === 0) {
            return res.status(404).json({ message: "No user month loan records found" });
        }

        // Fetch data from MonthEpfEtf table
        const monthEpfEtfs = await models.MonthEpfEtf.findAll();
        if (!monthEpfEtfs || monthEpfEtfs.length === 0) {
            return res.status(404).json({ message: "No month epf etf records found" });
        }

        // Iterate through basicSalaries to update or create deduction records
        const deductions = [];
        for (const basicSalary of basicSalaries) {
            // Fetch existing deduction record for the userId
            let deduction = await models.Deduction.findOne({ where: { userId: basicSalary.userId } });

            if (!deduction) {
                // If no existing record found, create a new one
                deduction = await models.Deduction.create({
                    userId: basicSalary.userId,
                    name: basicSalary.name,
                    monthLoan: 0,
                    epf8: 0,
                    totalDeduction: 0
                });
            } else {
                // If an existing record is found, update it
                deduction.name = basicSalary.name; // Update name if it has changed
                await deduction.save(); // Save the changes
            }

            // Find the userMonthLoan for the userId
            const userMonthLoan = userMonthLoans.find(uml => uml.userId === basicSalary.userId);
            if (userMonthLoan) {
                // Update the monthLoan
                deduction.monthLoan = userMonthLoan.monthLoan;
                await deduction.save(); // Save the changes
            }

            // Find the monthEpfEtf for the userId
            const monthEpfEtf = monthEpfEtfs.find(mee => mee.userId === basicSalary.userId);
            if (monthEpfEtf) {
                // Update the epf
                deduction.epf8 = monthEpfEtf.epf8;
                await deduction.save(); // Save the changes
            }

            // Calculate the totalDeduction
            deduction.totalDeduction = deduction.monthLoan + deduction.epf8;
            await deduction.save(); // Save the changes

            deductions.push(deduction);
        }

        res.status(200).json({
            message: "Deductions updated/created successfully",
            deductions: deductions
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

//creat function to show Deduction data
function DeductionShow(req, res) {
    models.Deduction.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

//creat function to save  FoodAllowance table to allwanceDate(input date 2023.01.01 i need to ouput 2023.01.01) and allowance  data
function FoodAllowanSave(req, res) {
    const foodallowance = {
        allowanceDate: new Date(req.body.allowanceDate), // Parse the date string as a Date object
        allowance: req.body.allowance
    };

    // Validation schema
    const schema = {
        allowanceDate: { type: "date", optional: false },
        allowance: { type: "number", optional: false }
    };

    // Create a validator instance
    const v = new Validator();
    const validationResponse = v.validate(foodallowance, schema);

    // Check if validation failed
    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    // Save FoodAllowance
    models.FoodAllowance.create(foodallowance).then(result => {
        res.status(201).json({
            message: "FoodAllowance created successfully",
            foodallowance: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

//creat function to show FoodAllowance data
function FoodAllowanceShow(req, res) {
    models.FoodAllowance.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

//creat function to show  FoodAllowance data use id
function FoodAllowanceShowId(req, res) {
    const tableId = req.params.tableId;

    models.FoodAllowance.findByPk(tableId)
        .then(result => {
            if (!result) {
                return res.status(404).json({
                    message: "FoodAllowance not found"
                });
            }
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
}




//creat function to update FoodAllowance data
function FoodAllowanceUpdate(req, res) {
    const tableId = req.params.tableId;
    const updatedFoodAllowance = {
        allowanceDate: new Date(req.body.allowanceDate), // Parse the date string as a Date object
        allowance: req.body.allowance
    };

    // Validation schema for update
    const schema = {
        allowanceDate: { type: "date", optional: false },
        allowance: { type: "number", optional: false }
    };

    // Validate updated data
    const v = new Validator();
    const validationResponse = v.validate(updatedFoodAllowance, schema);

    // Check validation result
    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    // Update FoodAllowance
    models.FoodAllowance.findByPk(tableId)
        .then(foodallowance => {
            if (!foodallowance) {
                return res.status(404).json({
                    message: "FoodAllowance not found"
                });
            }
            // Update FoodAllowance
            return foodallowance.update(updatedFoodAllowance)
                .then(updatedFoodAllowance => {
                    res.status(200).json({
                        message: "FoodAllowance updated successfully",
                        foodallowance: updatedFoodAllowance
                    });
                })
                .catch(error => {
                    res.status(500).json({
                        message: "Failed to update FoodAllowance",
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

//creat function to delete FoodAllowance data
function FoodAllowanceDelete(req, res) {
    const tableId = req.params.tableId;

    // Find FoodAllowance by table ID and destroy it
    models.FoodAllowance.findByPk(tableId)
        .then(foodallowance => {
            if (!foodallowance) {
                return res.status(404).json({
                    message: "FoodAllowance not found"
                });
            }
            // Destroy FoodAllowance
            return foodallowance.destroy()
                .then(() => {
                    res.status(200).json({
                        message: "FoodAllowance deleted successfully"
                    });
                })
                .catch(error => {
                    res.status(500).json({
                        message: "Failed to delete FoodAllowance",
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

//creat function Fetch and auto add to data MonthFoodAllowances table BasicSalary table (userId,name,attenCount) and  FoodAllowance table(lates Date :allowance) and totalAllowance(attenCount*allowance) data
async function MonthFoodAllowance(req, res) {
    try {
        // Fetch data from BasicSalary table
        const basicSalaries = await models.BasicSalary.findAll();
        if (!basicSalaries || basicSalaries.length === 0) {
            return res.status(404).json({ message: "No basic salary records found" });
        }

        // Fetch the latest FoodAllowance record
        const foodAllowance = await models.FoodAllowance.findOne({
            order: [['allowanceDate', 'DESC']]
        });
        if (!foodAllowance) {
            return res.status(404).json({ message: "No food allowance record found" });
        }

        // Iterate through basicSalaries to update or create month food allowance records
        const monthFoodAllowances = [];
        for (const basicSalary of basicSalaries) {
            // Fetch existing month food allowance record for the userId
            let monthFoodAllowance = await models.MonthFoodAllowance.findOne({ where: { userId: basicSalary.userId } });

            if (!monthFoodAllowance) {
                // If no existing record found, create a new one
                monthFoodAllowance = await models.MonthFoodAllowance.create({
                    userId: basicSalary.userId,
                    name: basicSalary.name,
                    attenCount: basicSalary.attenCount,
                    allowance: foodAllowance.allowance,
                    totalAllowance: basicSalary.attenCount * foodAllowance.allowance
                });
            } else {
                // If an existing record is found, update it
                monthFoodAllowance.attenCount = basicSalary.attenCount;
                monthFoodAllowance.allowance = foodAllowance.allowance;
                monthFoodAllowance.totalAllowance = basicSalary.attenCount * foodAllowance.allowance;
                await monthFoodAllowance.save();
            }

            monthFoodAllowances.push(monthFoodAllowance);
        }

        res.status(200).json({
            message: "MonthFoodAllowances updated/created successfully",
            monthFoodAllowances: monthFoodAllowances
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

//creat function to show MonthFoodAllowance data
function MonthFoodAllowanceShow(req, res) {
    models.MonthFoodAllowance.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}


//creat function to add to RoleOTIncomee (role,timeIncome) data
function RoleOTIncomeSave(req, res) {
    const roleotincome = {
        role: req.body.role,
        timeIncome: req.body.timeIncome
    };

    // Validation schema
    const schema = {
        role: { type: "string", optional: false },
        timeIncome: { type: "number", optional: false }
    };

    // Create a validator instance
    const v = new Validator();
    const validationResponse = v.validate(roleotincome, schema);

    // Check if validation failed
    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    // Save RoleOTIncome
    models.RoleOTIncome.create(roleotincome).then(result => {
        res.status(201).json({
            message: "RoleOTIncome created successfully",
            roleotincome: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

//creat function to show RoleOTIncome data
function RoleOTIncomeShow(req, res) {
    models.RoleOTIncome.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

//creat function to show table id RoleOTIncome data
function RoleOTIncomeShowById(req, res) {
    const tableId = req.params.tableId;

    models.RoleOTIncome.findByPk(tableId)
        .then(result => {
            if (!result) {
                return res.status(404).json({
                    message: "RoleOTIncome not found"
                });
            }
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
}



//creat function to update RoleOTIncome 
function RoleOTIncomeUpdate(req, res) {
    const tableId = req.params.tableId;
    const updatedRoleOTIncome = {
        role: req.body.role,
        timeIncome: req.body.timeIncome
    };

    // Validation schema for update
    const schema = {
        role: { type: "string", optional: false },
        timeIncome: { type: "number", optional: false }
    };

    // Validate updated data
    const v = new Validator();
    const validationResponse = v.validate(updatedRoleOTIncome, schema);

    // Check validation result
    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    // Update RoleOTIncome
    models.RoleOTIncome.findByPk(tableId)
        .then(roleotincome => {
            if (!roleotincome) {
                return res.status(404).json({
                    message: "RoleOTIncome not found"
                });
            }
            // Update RoleOTIncome
            return roleotincome.update(updatedRoleOTIncome)
                .then(updatedRoleOTIncome => {
                    res.status(200).json({
                        message: "RoleOTIncome updated successfully",
                        roleotincome: updatedRoleOTIncome
                    });
                })
                .catch(error => {
                    res.status(500).json({
                        message: "Failed to update RoleOTIncome",
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

//creat function to delete RoleOTIncome data
function RoleOTIncomeDelete(req, res) {
    const tableId = req.params.tableId;

    // Find RoleOTIncome by table ID and destroy it
    models.RoleOTIncome.findByPk(tableId)
        .then(roleotincome => {
            if (!roleotincome) {
                return res.status(404).json({
                    message: "RoleOTIncome not found"
                });
            }
            // Destroy RoleOTIncome
            return roleotincome.destroy()
                .then(() => {
                    res.status(200).json({
                        message: "RoleOTIncome deleted successfully"
                    });
                })
                .catch(error => {
                    res.status(500).json({
                        message: "Failed to delete RoleOTIncome",
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

// creat function to MonthOT table (userId,name,roleId,extraTimeCount,tIncome,totalOT) userId,name,roleId use for BasicSalary table  and  RoleOTIncome table(MonthOT table get roleId for Fetch to RoleOTIncome:id timeIncome(save to MonthOT table : tIncome)) data// creat function to MonthOT table (userId,name,roleId,extraTimeCount,tIncome,totalOT) userId,name,roleId use for BasicSalary table  and  RoleOTIncome table(MonthOT table get roleId for Fetch to RoleOTIncome:id timeIncome(save to MonthOT table : tIncome))  and If the time interval between the timeIn and timeOut of those whose status is "Present" has increased to 8 hours in relation to the userId in the Attendance table in relation to this month in the Attendance table, get that value (convert timeIn, timeOut to integers). Save it to the extraTimeCount in the MonthOT table.
// async function MonthOT(req, res) {
//     try {
//         // Fetch data from BasicSalary table
//         const basicSalaries = await models.BasicSalary.findAll();
//         if (!basicSalaries || basicSalaries.length === 0) {
//             return res.status(404).json({ message: "No basic salary records found" });
//         }

//         // Fetch data from RoleOTIncome table
//         const roleOTIncomes = await models.RoleOTIncome.findAll();
//         if (!roleOTIncomes || roleOTIncomes.length === 0) {
//             return res.status(404).json({ message: "No role OT income records found" });
//         }

//         // Get the start and end dates of the current month
//         const startDate = moment().startOf('month');
//         const endDate = moment().endOf('month');

//         // Fetch attendance records for the current month
//         const attendances = await models.Attendance.findAll({
//             where: {
//                 dateIn: {
//                     [models.Sequelize.Op.between]: [startDate, endDate]
//                 }
//             }
//         });

//         if (!attendances || attendances.length === 0) {
//             return res.status(404).json({ message: "No attendance records found for the current month" });
//         }

//         // Calculate extraTimeCount for each user
//         const extraTimeCountMap = {};
//         for (const attendance of attendances) {
//             if (!extraTimeCountMap[attendance.userId]) {
//                 extraTimeCountMap[attendance.userId] = 0;
//             }

//             const timeIn = moment(attendance.timeIn, 'HH:mm:ss');
//             const timeOut = moment(attendance.timeOut, 'HH:mm:ss');

//             // Get the hour component as integers
//             const timeInHour = timeIn.hour();
//             const timeOutHour = timeOut.hour();

//             // If the time interval between the timeIn and timeOut of those whose status is "Present" has increased to 8 hours in relation to the userId in the Attendance table for this month in the Attendance table, get that value (exTime = timeOut-timeOut) (convert timeIn, timeOut to integers ). Save it to the extraTimeCount in the MonthOT table.Save it to the extraTimeCount in the MonthOT table.

//             if ((attendance.status === "Present") && ((timeOutHour - timeInHour) > 8)) {
//                 //    extraTimeCountMap[attendance.userId]++;
//                 console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
//                 const x = (timeOutHour - timeInHour) - 8;
//                 extraTimeCountMap[attendance.userId] += x;
//                 console.log(extraTimeCountMap[attendance.userId])


//             }

//         }

//         // Iterate through basicSalaries to update or create month OT records
//         const monthOTs = [];
//         for (const basicSalary of basicSalaries) {
//             let monthOT = await models.MonthOT.findOne({ where: { userId: basicSalary.userId } });

//             if (!monthOT) {
//                 // If no existing record found, create a new one
//                 monthOT = await models.MonthOT.create({
//                     userId: basicSalary.userId,
//                     name: basicSalary.name,
//                     roleId: 0,
//                     extraTimeCount: 0,
//                     tIncome: 0,
//                     totalOT: 0
//                 });
//             } else {
//                 // If an existing record is found, update extraTimeCount
//                 monthOT.extraTimeCount = extraTimeCountMap[basicSalary.userId] || 0;
//                 await monthOT.save(); // Save the changes
//             }

//             // Find the roleId for the userId
//             const roleId = basicSalary.roleId;
//             if (roleId) {
//                 const roleOTIncome = roleOTIncomes.find(roi => roi.id === roleId);
//                 if (roleOTIncome) {
//                     monthOT.roleId = roleId;
//                     monthOT.tIncome = roleOTIncome.timeIncome;
//                     await monthOT.save(); // Save the changes
//                 }
//             }

//             // Calculate totalOT
//             monthOT.totalOT = monthOT.extraTimeCount * monthOT.tIncome;
//             await monthOT.save(); // Save the changes

//             monthOTs.push(monthOT);
//         }

//         res.status(200).json({
//             message: "MonthOTs updated/created successfully",
//             monthOTs: monthOTs
//         });
//     }
//     catch (error) {
//         res.status(500).json({
//             message: "Something went wrong",
//             error: error.message
//         });
//     }
// }


async function MonthOT(req, res) {
    try {
        // Fetch data from BasicSalary table
        const basicSalaries = await models.BasicSalary.findAll();
        if (!basicSalaries || basicSalaries.length === 0) {
            return res.status(404).json({ message: "No basic salary records found" });
        }

        // Fetch data from RoleOTIncome table
        const roleOTIncomes = await models.RoleOTIncome.findAll();
        if (!roleOTIncomes || roleOTIncomes.length === 0) {
            return res.status(404).json({ message: "No role OT income records found" });
        }

        // Get the start and end dates of the current month
        const startDate = moment().startOf('month');
        const endDate = moment().endOf('month');

        // Fetch attendance records for the current month
        const attendances = await models.Attendance.findAll({
            where: {
                dateIn: {
                    [models.Sequelize.Op.between]: [startDate, endDate]
                }
            }
        });

        const extraTimeCountMap = {};
        if (attendances && attendances.length > 0) {
            // Calculate extraTimeCount for each user
            for (const attendance of attendances) {
                if (!extraTimeCountMap[attendance.userId]) {
                    extraTimeCountMap[attendance.userId] = 0;
                }

                const timeIn = moment(attendance.timeIn, 'HH:mm:ss');
                const timeOut = moment(attendance.timeOut, 'HH:mm:ss');

                // Get the hour component as integers
                const timeInHour = timeIn.hour();
                const timeOutHour = timeOut.hour();

                // If the time interval between the timeIn and timeOut of those whose status is "Present" has increased to 8 hours in relation to the userId in the Attendance table for this month in the Attendance table, get that value (exTime = timeOut-timeIn) (convert timeIn, timeOut to integers). Save it to the extraTimeCount in the MonthOT table.

                if (attendance.status === "Present" && (timeOutHour - timeInHour) > 8) {
                    const extraHours = (timeOutHour - timeInHour) - 8;
                    extraTimeCountMap[attendance.userId] += extraHours;
                }
            }
        }

        // Iterate through basicSalaries to update or create month OT records
        const monthOTs = [];
        for (const basicSalary of basicSalaries) {
            let monthOT = await models.MonthOT.findOne({ where: { userId: basicSalary.userId } });

            if (!monthOT) {
                // If no existing record found, create a new one
                monthOT = await models.MonthOT.create({
                    userId: basicSalary.userId,
                    name: basicSalary.name,
                    roleId: 0,
                    extraTimeCount: 0,
                    tIncome: 0,
                    totalOT: 0
                });
            } else {
                // If an existing record is found, update extraTimeCount
                monthOT.extraTimeCount = extraTimeCountMap[basicSalary.userId] || 0;
                await monthOT.save(); // Save the changes
            }

            // Find the roleId for the userId
            const roleId = basicSalary.roleId;
            if (roleId) {
                const roleOTIncome = roleOTIncomes.find(roi => roi.id === roleId);
                if (roleOTIncome) {
                    monthOT.roleId = roleId;
                    monthOT.tIncome = roleOTIncome.timeIncome;
                    await monthOT.save(); // Save the changes
                }
            }

            // Calculate totalOT
            monthOT.totalOT = monthOT.extraTimeCount * monthOT.tIncome;
            await monthOT.save(); // Save the changes

            monthOTs.push(monthOT);
        }

        res.status(200).json({
            message: "MonthOTs updated/created successfully",
            monthOTs: monthOTs
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}









//creat function to show MonthOT
function MonthOTShow(req, res) {
    models.MonthOT.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

// creat function In getting the data to the Addition table, all the userId,name of the BasicSalary table are used to get the (userId,name) in the Addition table. When getting the totalOT data of the Addition table, the totalOT value is updated to the totalOT of the Addition table in relation to the userId of the MonthOT table, which is related to the userId of the Addition table. When getting the totalAllowance data of the Addition table, the totalAllowance value is updated to the totalAllowance of the Addition table in relation to the userId of the MonthFoodAllowance table, which is related to the userId of the Addition table. When getting the totalAddition in the Addition table, the totalOT+ totalAllowance is done in the Addition table.//In getting the data to the Addition table, all the userId,name of the BasicSalary table are used to get the (userId,name) in the Addition table. When getting the totalOT data of the Addition table, the totalOT value is updated to the totalOT of the Addition table in relation to the userId of the MonthOT table, which is related to the userId of the Addition table. When getting the totalAllowance data of the Addition table, the totalAllowance value is updated to the totalAllowance of the Addition table in relation to the userId of the MonthFoodAllowance table, which is related to the userId of the Addition table. When getting the totalAddition in the Addition table, the totalOT+ totalAllowance is done in the Addition table.
async function Additions(req, res) {
    try {
        // Fetch data from BasicSalary table
        const basicSalaries = await models.BasicSalary.findAll();
        if (!basicSalaries || basicSalaries.length === 0) {
            return res.status(404).json({ message: "No basic salary records found" });
        }

        // Fetch data from MonthOT table
        const monthOTs = await models.MonthOT.findAll();
        if (!monthOTs || monthOTs.length === 0) {
            return res.status(404).json({ message: "No month OT records found" });
        }

        console.log(monthOTs)

        // Iterate through basicSalaries to update or create addition records
        const additions = [];
        for (const basicSalary of basicSalaries) {
            let addition = await models.Addition.findOne({ where: { userId: basicSalary.userId } });

            if (!addition) {
                // If no existing record found, create a new one
                addition = await models.Addition.create({
                    userId: basicSalary.userId,
                    name: basicSalary.name,
                    totalOT: 0,
                    totalAllowance: 0,
                    totalAddition: 0
                });
            } else {
                // If an existing record is found, update it
                await addition.save(); // Save the changes
            }

            // Find the monthOT for the userId
            let monthOT = await models.MonthOT.findOne({ where: { userId: basicSalary.userId } });

            if (monthOT) {
                console.log()
                // Update the totalOT
                addition.totalOT = monthOT.totalOT;
                await addition.save(); // Save the changes
            }

            // Find the totalAllowance for the userId
            let totalAllowance = await models.MonthFoodAllowance.findOne({ where: { userId: basicSalary.userId } });
            if (totalAllowance) {
                // Update the totalAllowance
                addition.totalAllowance = totalAllowance.totalAllowance;
                await addition.save(); // Save the changes
            }

            // Calculate the totalAddition
            addition.totalAddition = addition.totalOT + addition.totalAllowance;
            await addition.save(); // Save the changes

            additions.push(addition);
        }

        res.status(200).json({
            message: "Additions updated/created successfully",
            additions: additions
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

//creat function show Addtion
function AdditionsShow(req, res) {
    models.Addition.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

//creat function Fetch and All auto add to data UserNetPays table BasicSalary table (userId,name) and Fetch  Earning table(totalEarning) and  Fetch to Addition table(totalAddition) and Fetch to Deduction table(totalDeduction) and Calculate to UserNetPays:netTotal((totalEarning+totalAddition)-totalDeduction) data
async function UserNetPay(req, res) {
    try {
        // Fetch data from BasicSalary table
        const basicSalaries = await models.BasicSalary.findAll();
        if (!basicSalaries || basicSalaries.length === 0) {
            return res.status(404).json({ message: "No basic salary records found" });
        }

        // Fetch data from Earning table
        const earnings = await models.Earning.findAll();
        if (!earnings || earnings.length === 0) {
            return res.status(404).json({ message: "No earning records found" });
        }

        // Fetch data from Addition table
        const additions = await models.Addition.findAll();
        if (!additions || additions.length === 0) {
            return res.status(404).json({ message: "No addition records found" });
        }

        // Fetch data from Deduction table
        const deductions = await models.Deduction.findAll();
        if (!deductions || deductions.length === 0) {
            return res.status(404).json({ message: "No deduction records found" });
        }

        // Iterate through basicSalaries to update or create user net pay records
        const userNetPays = [];
        for (const basicSalary of basicSalaries) {
            let userNetPay = await models.UserNetPay.findOne({ where: { userId: basicSalary.userId } });

            if (!userNetPay) {
                // If no existing record found, create a new one
                userNetPay = await models.UserNetPay.create({
                    userId: basicSalary.userId,
                    name: basicSalary.name,
                    netTotal: 0
                });
            } else {
                // If an existing record is found, update it
                await userNetPay.save(); // Save the changes
            }

            // Find the totalEarning for the userId
            let totalEarning = await models.Earning.findOne({ where: { userId: basicSalary.userId } });
            if (totalEarning) {
                // Update the totalEarning
                userNetPay.totalEarning = totalEarning.totalEarning;
                await userNetPay.save(); // Save the changes
            }

            // Find the totalAddition for the userId
            let totalAddition = await models.Addition.findOne({ where: { userId: basicSalary.userId } });
            if (totalAddition) {
                // Update the totalAddition
                userNetPay.totalAddition = totalAddition.totalAddition;
                await userNetPay.save(); // Save the changes
            }

            // Find the totalDeduction for the userId
            let totalDeduction = await models.Deduction.findOne({ where: { userId: basicSalary.userId } });
            if (totalDeduction) {
                // Update the totalDeduction
                userNetPay.totalDeduction = totalDeduction.totalDeduction;
                await userNetPay.save(); // Save the changes
            }

            // Calculate the netTotal
            userNetPay.netTotal = (userNetPay.totalEarning + userNetPay.totalAddition) - userNetPay.totalDeduction;
            await userNetPay.save(); // Save the changes

            userNetPays.push(userNetPay);
        }

        res.status(200).json({
            message: "UserNetPays updated/created successfully",
            userNetPays: userNetPays
        });
    }

    catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

//creat function to show UserNetPay
function UserNetPayShow(req, res) {
    models.UserNetPay.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

//creat function Fetch and All auto add to data MonthSalarySheet table(currentDate(Current Date),userId,name,role(name),basicSalary,baValue,totalEarning,monthLoan,epf8,totalDeduction,totalAllowance,totalOT,totalAddition,netTotal,epf12,etf3,totaNetPay)  and BasicSalary table (userId,name,role(name): (Fetch to RoleIncome table  to BasicSalary roleId )) and Fetch  Earning table(basicSalary,baValue,totalEarning) and Fetch to Deduction table(monthLoan,epf8,totalDeduction) and  Fetch to Addition table(totalOT,totalAllowance,totalAddition) and Fetch to UserNetPay table(netTotal) and Fetch to MonthEpfEtf table(epf12,etf3) and Fetch to UserNetPay table(netTotal: MonthSalarySheet  table totaNetPay ) data
// async function MonthSalarySheet(req, res) {

//     try {
//         // Fetch data from BasicSalary table
//         const basicSalaries = await models.BasicSalary.findAll();
//         if (!basicSalaries || basicSalaries.length === 0) {
//             return res.status(404).json({ message: "No basic salary records found" });
//         }

//         // Fetch data from Earning table
//         const earnings = await models.Earning.findAll();
//         if (!earnings || earnings.length === 0) {
//             return res.status(404).json({ message: "No earning records found" });
//         }

//         // Fetch data from Deduction table
//         const deductions = await models.Deduction.findAll();
//         if (!deductions || deductions.length === 0) {
//             return res.status(404).json({ message: "No deduction records found" });
//         }

//         // Fetch data from Addition table
//         const additions = await models.Addition.findAll();
//         if (!additions || additions.length === 0) {
//             return res.status(404).json({ message: "No addition records found" });
//         }

//         // Fetch data from UserNetPay table
//         const userNetPays = await models.UserNetPay.findAll();
//         if (!userNetPays || userNetPays.length === 0) {
//             return res.status(404).json({ message: "No user net pay records found" });
//         }

//         // Fetch data from MonthEpfEtf table
//         const monthEpfEtfs = await models.MonthEpfEtf.findAll();
//         if (!monthEpfEtfs || monthEpfEtfs.length === 0) {
//             return res.status(404).json({ message: "No month epf etf records found" });
//         }

//         // Get the current date
//         const currentDate = new Date();

//         // Iterate through basicSalaries to update or create month salary sheet records
//         const monthSalarySheets = [];
//         for (const basicSalary of basicSalaries) {
//             let monthSalarySheet = await models.MonthSalarySheet.findOne({ where: { userId: basicSalary.userId } });

//             if (!monthSalarySheet) {
//                 // If no existing record found, create a new one
//                 monthSalarySheet = await models.MonthSalarySheet.create({
//                     currentDate: currentDate,
//                     userId: basicSalary.userId,
//                     name: basicSalary.name,
//                     role: basicSalary.roleId,
//                     basicSalary: basicSalary.basicSalary,
//                     baValue: 0,
//                     totalEarning: 0,
//                     monthLoan: 0,
//                     epf8: 0,
//                     totalDeduction: 0,
//                     totalAllowance: 0,
//                     totalOT: 0,
//                     totalAddition: 0,
//                     netTotal: 0,
//                     epf12: 0,
//                     etf3: 0,
//                     totaNetPay: 0
//                 });
//             }

//             // Find the baValue for the userId
//             let baValue = await models.Earning.findOne({ where: { userId: basicSalary.userId } });
//             if (baValue) {
//                 // Update the baValue
//                 monthSalarySheet.baValue = baValue.baValue;
//                 await monthSalarySheet.save(); // Save the changes
//             }

//             // Find the totalEarning for the userId
//             let totalEarning = await models.Earning.findOne({ where: { userId: basicSalary.userId } });
//             if (totalEarning) {
//                 // Update the totalEarning
//                 monthSalarySheet.totalEarning = totalEarning.totalEarning;
//                 await monthSalarySheet.save(); // Save the changes
//             }



//             // Find the monthLoan for the userId
//             let monthLoan = await models.Deduction.findOne({ where: { userId: basicSalary.userId } });
//             if (monthLoan) {
//                 // Update the monthLoan
//                 monthSalarySheet.monthLoan = monthLoan.monthLoan;
//                 await monthSalarySheet.save(); // Save the changes
//             }

//             // find the epf8 for the userId
//             let epf8 = await models.Deduction.findOne({ where: { userId: basicSalary.userId } });
//             if (epf8) {
//                 // Update the epf8
//                 monthSalarySheet.epf8 = epf8.epf8;
//                 await monthSalarySheet.save(); // Save the changes
//             }
//             // Find the totalDeduction for the userId
//             let totalDeduction = await models.Deduction.findOne({ where: { userId: basicSalary.userId } });
//             if (totalDeduction) {
//                 // Update the totalDeduction
//                 monthSalarySheet.totalDeduction = totalDeduction.totalDeduction;
//                 await monthSalarySheet.save(); // Save the changes
//             }

//             //find the totalAllowance for the userId
//             let totalAllowance = await models.Addition.findOne({ where: { userId: basicSalary.userId } });
//             if (totalAllowance) {
//                 // Update the totalAllowance
//                 monthSalarySheet.totalAllowance = totalAllowance.totalAllowance;
//                 await monthSalarySheet.save(); // Save the changes
//             }

//             //find the totalOT for the userId
//             let totalOT = await models.Addition.findOne({ where: { userId: basicSalary.userId } });
//             if (totalOT) {
//                 // Update the totalOT
//                 monthSalarySheet.totalOT = totalOT.totalOT;
//                 await monthSalarySheet.save(); // Save the changes
//             }

//             // Find the totalAddition for the userId
//             let totalAddition = await models.Addition.findOne({ where: { userId: basicSalary.userId } });
//             if (totalAddition) {
//                 // Update the totalAddition
//                 monthSalarySheet.totalAddition = totalAddition.totalAddition;
//                 await monthSalarySheet.save(); // Save the changes
//             }

//             // Find the netTotal for the userId
//             let netTotal = await models.UserNetPay.findOne({ where: { userId: basicSalary.userId } });
//             if (netTotal) {
//                 // Update the netTotal
//                 monthSalarySheet.netTotal = netTotal.netTotal;
//                 await monthSalarySheet.save(); // Save the changes
//             }

//             // Find the epf12 and etf3 for the userId
//             let monthEpfEtf = await models.MonthEpfEtf.findOne({ where: { userId: basicSalary.userId } });
//             if (monthEpfEtf) {
//                 // Update the epf12 and etf3
//                 monthSalarySheet.epf12 = monthEpfEtf.epf12;
//                 monthSalarySheet.etf3 = monthEpfEtf.etf3;
//                 await monthSalarySheet.save(); // Save the changes
//             }

//             // Calculate the totaNetPay

//             monthSalarySheet.totaNetPay = monthSalarySheet.netTotal - (monthSalarySheet.epf12 + monthSalarySheet.etf3);
//             await monthSalarySheet.save(); // Save the changes

//             monthSalarySheets.push(monthSalarySheet);
//         }

//         res.status(200).json({
//             message: "MonthSalarySheets updated/created successfully",
//             monthSalarySheets: monthSalarySheets
//         });
//     }

//     catch (error) {
//         res.status(500).json({
//             message: "Something went wrong",
//             error: error.message
//         });
//     }
// }



//creat function Fetch and All auto add to data MonthSalarySheet table(currentDate(Current Date),userId,name,role(name),basicSalary,baValue,totalEarning,monthLoan,epf8,totalDeduction,totalAllowance,totalOT,totalAddition,netTotal,epf12,etf3,totaNetPay)  and BasicSalary table (userId,name,role(name): (Fetch to RoleIncome table  to BasicSalary roleId )) and Fetch  Earning table(basicSalary,baValue,totalEarning) and Fetch to Deduction table(monthLoan,epf8,totalDeduction) and  Fetch to Addition table(totalOT,totalAllowance,totalAddition) and Fetch to UserNetPay table(netTotal) and Fetch to MonthEpfEtf table(epf12,etf3) and Fetch to UserNetPay table(netTotal: MonthSalarySheet  table totaNetPay ) The same userId should not be entered repeatedly. Other data here should be updated.  data

async function MonthSalarySheet(req, res) {
    try {
        // Fetch all basic salaries
        const basicSalaries = await models.BasicSalary.findAll();
        if (!basicSalaries.length) return res.status(404).json({ message: "No basic salary records found" });

        const monthSalarySheets = [];
        for (const basicSalary of basicSalaries) {
            // Fetch associated records for each basicSalary record
            const [earnings, deductions, additions, epfEtfs] = await Promise.all([
                models.Earning.findAll({ where: { userId: basicSalary.userId } }),
                models.Deduction.findAll({ where: { userId: basicSalary.userId } }),
                models.Addition.findAll({ where: { userId: basicSalary.userId } }),
                models.MonthEpfEtf.findAll({ where: { userId: basicSalary.userId } })
            ]);

            // Mapping data from fetched arrays for quicker access
            const earning = earnings[0]; // Assuming one entry per user, adjust as needed
            const deduction = deductions[0];
            const addition = additions[0];
            const epfEtf = epfEtfs[0];

            // Fetch or initialize month salary sheet
            let monthSalarySheet = await models.MonthSalarySheet.findOne({ where: { userId: basicSalary.userId } });

            const data = {
                currentDate: new Date(),
                userId: basicSalary.userId,
                name: basicSalary.name,
                role: basicSalary.roleId,
                basicSalary: basicSalary.basicSalary,
                baValue: earning ? earning.baValue : 0,
                totalEarning: earning ? earning.totalEarning : 0,
                monthLoan: deduction ? deduction.monthLoan : 0,
                epf8: deduction ? deduction.epf8 : 0,
                totalDeduction: deduction ? deduction.totalDeduction : 0,
                totalAllowance: addition ? addition.totalAllowance : 0,
                totalOT: addition ? addition.totalOT : 0,
                totalAddition: addition ? addition.totalAddition : 0,
                netTotal:  ((earning ? earning.totalEarning : 0) + (addition ? addition.totalAddition : 0)) - (deduction ? deduction.totalDeduction : 0),
                epf12: epfEtf ? epfEtf.epf12 : 0,
                etf3: epfEtf ? epfEtf.etf3 : 0,
                totaNetPay: 0 // This will be calculated next
            };

            // Calculate totaNetPay
            data.totaNetPay = data.netTotal - (data.epf12 + data.etf3);

            if (!monthSalarySheet) {
                monthSalarySheet = await models.MonthSalarySheet.create(data);
            } else {
                await monthSalarySheet.update(data);
            }

            await monthSalarySheet.save();
            monthSalarySheets.push(monthSalarySheet);
        }

        res.status(200).json({
            message: "MonthSalarySheets updated/created successfully",
            monthSalarySheets: monthSalarySheets
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}





//creat function to show MonthSalarySheet
function MonthSalarySheetShow(req, res) {
    models.MonthSalarySheet.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

//creat function to show MonthSalarySheet table id
function MonthSalarySheetIdShowID(req, res) {
    const tableId = req.params.tableId;

    models.MonthSalarySheet.findByPk(tableId).then(result => {
        if (!result) {
            return res.status(404).json({
                message: "MonthSalarySheet not found"
            });
        }
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}


//creat function to Fetch to SubTotalMonthSalarySheet table "currentDate:date totalbasicSalary:float totalbaValue:float fulltotalEarning:float totalmonthLoan:float totalepf8:float fulltotalDeduction:float fulltotalAllowance:float fulltotalOT:float fulltotalAddition:float fullnetTotal:float totalepf12:float totaletf3:float fulltotalNetPay:float"
async function SubTotalMonthSalarySheet(req, res) {
    try {
        // Fetch data from MonthSalarySheet table
        const monthSalarySheets = await models.MonthSalarySheet.findAll();
        if (!monthSalarySheets || monthSalarySheets.length === 0) {
            return res.status(404).json({ message: "No month salary sheet records found" });
        }

        // Calculate the subtotals
        let totalbasicSalary = 0;
        let totalbaValue = 0;
        let fulltotalEarning = 0;
        let totalmonthLoan = 0;
        let totalepf8 = 0;
        let fulltotalDeduction = 0;
        let fulltotalAllowance = 0;
        let fulltotalOT = 0;
        let fulltotalAddition = 0;
        let fullnetTotal = 0;
        let totalepf12 = 0;
        let totaletf3 = 0;
        let fulltotalNetPay = 0;

        for (const monthSalarySheet of monthSalarySheets) {
            totalbasicSalary += monthSalarySheet.basicSalary;
            totalbaValue += monthSalarySheet.baValue;
            fulltotalEarning += monthSalarySheet.totalEarning;
            totalmonthLoan += monthSalarySheet.monthLoan;
            totalepf8 += monthSalarySheet.epf8;
            fulltotalDeduction += monthSalarySheet.totalDeduction;
            fulltotalAllowance += monthSalarySheet.totalAllowance;
            fulltotalOT += monthSalarySheet.totalOT;
            fulltotalAddition += monthSalarySheet.totalAddition;
            fullnetTotal += monthSalarySheet.netTotal;
            totalepf12 += monthSalarySheet.epf12;
            totaletf3 += monthSalarySheet.etf3;
            fulltotalNetPay += monthSalarySheet.totaNetPay;
        }

        // Get the current date
        const currentDate = moment().startOf('day').toDate(); // Get the current date without time

        // Check if a record already exists for the current date
        let subTotalMonthSalarySheet = await models.SubTotalMonthSalarySheet.findOne({ where: { currentDate: currentDate } });

        // If a record exists, update it; otherwise, create a new record
        if (subTotalMonthSalarySheet) {
            await subTotalMonthSalarySheet.update({
                totalbasicSalary: totalbasicSalary,
                totalbaValue: totalbaValue,
                fulltotalEarning: fulltotalEarning,
                totalmonthLoan: totalmonthLoan,
                totalepf8: totalepf8,
                fulltotalDeduction: fulltotalDeduction,
                fulltotalAllowance: fulltotalAllowance,
                fulltotalOT: fulltotalOT,
                fulltotalAddition: fulltotalAddition,
                fullnetTotal: fullnetTotal,
                totalepf12: totalepf12,
                totaletf3: totaletf3,
                fulltotalNetPay: fulltotalNetPay
            });
        } else {
            // Create a new record
            subTotalMonthSalarySheet = await models.SubTotalMonthSalarySheet.create({
                currentDate: currentDate,
                totalbasicSalary: totalbasicSalary,
                totalbaValue: totalbaValue,
                fulltotalEarning: fulltotalEarning,
                totalmonthLoan: totalmonthLoan,
                totalepf8: totalepf8,
                fulltotalDeduction: fulltotalDeduction,
                fulltotalAllowance: fulltotalAllowance,
                fulltotalOT: fulltotalOT,
                fulltotalAddition: fulltotalAddition,
                fullnetTotal: fullnetTotal,
                totalepf12: totalepf12,
                totaletf3: totaletf3,
                fulltotalNetPay: fulltotalNetPay
            });
        }

        res.status(200).json({
            message: "SubTotalMonthSalarySheet created/updated successfully",
            subTotalMonthSalarySheet: subTotalMonthSalarySheet
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}


//creat function to SubTotalMonthSalarySheet table show
function SubTotalMonthSalarySheetShow(req, res) {
    models.SubTotalMonthSalarySheet.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

//creat function Fetch and All auto add to data AllMonthSalarySheet (monthCurrentDate:currentDate,userId:userId,name:name,role:role,allBasicSalary:basicSalary,allBaValue:baValue,allTotalEarning:totalEarning,allMonthLoan:monthLoan,allEpf8:epf8,allTotalDeduction:totalDeduction,allTotalAllowance:totalAllowance,allTotalOT:totalOT,allTotalAddtion:totalAddition,allNetTotal:netTotal allEpf12:epf12,allEtf3:allEtf3,allTotaNetPay:allTotaNetPay) and According to the current month in the MonthSalarySheets table, the same userId cannot be updated repeatedly in the same month. But other data is always obtained from MonthSalarySheets table data (allBasicSalary:basicSalary,allBaValue:baValue,allTotalEarning:totalEarning,allMonthLoan:monthLoan,allEpf8:epf8,allTotalDeduction:totalDeduction,allTotalAllowance:totalAllowance,allTotalOT:totalOT,allTotalAddition:totalAddition,allNetTotal:netTotal allEpf12 :epf12,allEtf3:allEtf3,allTotaNetPay:allTotaNetPay) should be valid at least once.

async function AllMonthSalarySheet(req, res) {
    try {
        const monthSalarySheets = await models.MonthSalarySheet.findAll();

        if (!monthSalarySheets.length) {
            return res.status(404).json({ message: "No month salary sheet records found" });
        }

        const allMonthSalarySheets = await Promise.all(monthSalarySheets.map(async (monthSalarySheet) => {
            // Retrieve the most recent AllMonthSalarySheet for the given userId
            let allMonthSalarySheet = await models.AllMonthSalarySheet.findOne({
                where: { userId: monthSalarySheet.userId },
                order: [['id', 'DESC']] // Orders by `id` in descending order, ensuring the most recent record is returned
            });

            const fieldsToUpdateOrCreate = {
                monthCurrentDate: monthSalarySheet.currentDate,
                userId: monthSalarySheet.userId,
                name: monthSalarySheet.name,
                role: monthSalarySheet.role,
                allBasicSalary: monthSalarySheet.basicSalary,
                allBaValue: monthSalarySheet.baValue,
                allTotalEarning: monthSalarySheet.totalEarning,
                allMonthLoan: monthSalarySheet.monthLoan,
                allEpf8: monthSalarySheet.epf8,
                allTotalDeduction: monthSalarySheet.totalDeduction,
                allTotalAllowance: monthSalarySheet.totalAllowance,
                allTotalOT: monthSalarySheet.totalOT,
                allTotalAddition: monthSalarySheet.totalAddition,
                allNetTotal: monthSalarySheet.netTotal,
                allEpf12: monthSalarySheet.epf12,
                allEtf3: monthSalarySheet.etf3,
                allTotaNetPay: monthSalarySheet.totaNetPay
            };

            if (!allMonthSalarySheet) {
                allMonthSalarySheet = await models.AllMonthSalarySheet.create(fieldsToUpdateOrCreate);
            } else {
                // Get the month from the latest AllMonthSalarySheet's date
                const allMonthSheetMonth = moment(allMonthSalarySheet.monthCurrentDate).format('YYYY-MM');
                const monthSheetMonth = moment(monthSalarySheet.currentDate).format('YYYY-MM');

                if (monthSheetMonth === allMonthSheetMonth) {
                    await allMonthSalarySheet.update(fieldsToUpdateOrCreate);
                } else {
                    console.log("xxxxxxxxxxxMonth mismatch - decide if you need a different action herexxxxxxxxx");
                    if (allMonthSalarySheet) {
                        const fieldsToUpdateOrCreate = {
                            monthCurrentDate: monthSalarySheet.currentDate,
                            userId: monthSalarySheet.userId,
                            name: monthSalarySheet.name,
                            role: monthSalarySheet.role,
                            allBasicSalary: monthSalarySheet.basicSalary,
                            allBaValue: monthSalarySheet.baValue,
                            allTotalEarning: monthSalarySheet.totalEarning,
                            allMonthLoan: monthSalarySheet.monthLoan,
                            allEpf8: monthSalarySheet.epf8,
                            allTotalDeduction: monthSalarySheet.totalDeduction,
                            allTotalAllowance: monthSalarySheet.totalAllowance,
                            allTotalOT: monthSalarySheet.totalOT,
                            allTotalAddition: monthSalarySheet.totalAddition,
                            allNetTotal: monthSalarySheet.netTotal,
                            allEpf12: monthSalarySheet.epf12,
                            allEtf3: monthSalarySheet.etf3,
                            allTotaNetPay: monthSalarySheet.totaNetPay
                        };
                        allMonthSalarySheet = await models.AllMonthSalarySheet.create(fieldsToUpdateOrCreate);
                    }
                }
            }

            return allMonthSalarySheet;
        }));

        res.status(200).json({
            message: "AllMonthSalarySheets updated/created successfully",
            allMonthSalarySheets: allMonthSalarySheets
        });

    } catch (error) {
        console.error('Failed processing AllMonthSalarySheet:', error);
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

//creat function to show AllMonthSalarySheet
function AllMonthSalarySheetShow(req, res) {
    models.AllMonthSalarySheet.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}


//creat function to show  table id AllMonthSalarySheet
function AllMonthSalarySheetIdShow(req, res) {
    const tableId = req.params.tableId;

    models.AllMonthSalarySheet.findByPk(tableId).then(result => {
        if (!result) {
            return res.status(404).json({
                message: "AllMonthSalarySheet not found"
            });
        }
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}






// //Creat function (userId:iniger,nameWini:string,nameWFull:string,birthdate:date,age:integer,roleId:intiger,gender:string,address:string,email:string,bankNumber:integer,phoneNumber:string,imgSrc:sring) save BioDataSave and validation data
// function BioDataSave(req, res) {
//     const { userId, nameWini, nameWFull, birthdate, age, roleId, gender, address, email, bankNumber, phoneNumber, imgSrc } = req.body;

//     if (!userId || !nameWini || !nameWFull || !birthdate || !age || !roleId || !gender || !address || !email || !bankNumber || !phoneNumber || !imgSrc) {
//         return res.status(400).json({ message: "All fields are required" });
//     }

//     models.BioData.create({
//         userId: userId,
//         nameWini: nameWini,
//         nameWFull: nameWFull,
//         birthdate: birthdate,
//         age: age,
//         roleId: roleId,
//         gender: gender,
//         address: address,
//         email: email,
//         bankNumber: bankNumber,
//         phoneNumber: phoneNumber,
//         imgSrc: imgSrc
//     }).then(result => {
//         res.status(201).json({
//             message: "BioData saved successfully",
//             bioData: result
//         });
//     }
//     ).catch(error => {
//         res.status(500).json({
//             message: "Something went wrong",
//             error: error
//         });
//     });
// }

// //Creat Function Show BioDataSave
// function BioDataShow(req, res) {
//     models.BioData.findAll().then(result => {
//         res.status(200).json(result);
//     }).catch(error => {
//         res.status(500).json({
//             message: "Something went wrong",
//             error: error
//         });
//     });
// }

// //Creat Function Show BioDataSave id
function BioDataShowId(req, res) {
    const tableId = req.params.tableId;

    models.BioData.findByPk(tableId).then(result => {
        if (!result) {
            return res.status(404).json({
                message: "BioData not found"
            });
        }
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

// //Creat Function Show BioDataSave userid
function BioDataShowUserId(req, res) {
    const userId = req.params.userId;

    models.BioData.findAll({ where: { userId: userId } }).then(result => {
        if (!result) {
            return res.status(404).json({
                message: "BioData not found"
            });
        }
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}




// //creat function to destroy BioData table id
// function BioDataDelete(req, res) {
//     const tableId = req.params.tableId;

//     models.BioData.findByPk(tableId).then(result => {
//         if (!result) {
//             return res.status(404).json({
//                 message: "BioData not found"
//             });
//         }
//         result.destroy().then(() => {
//             res.status(200).json({
//                 message: "BioData deleted successfully"
//             });
//         }).catch(error => {
//             res.status(500).json({
//                 message: "Something went wrong",
//                 error: error
//             });
//         });
//     }).catch(error => {
//         res.status(500).json({
//             message: "Something went wrong",
//             error: error
//         });
//     });
// }

// //creat function to Update BioData table
// function BioDataUpdate(req, res) {
//     const tableId = req.params.tableId;
//     const { userId, nameWini, nameWFull, birthdate, age, roleId, gender, address, email, bankNumber, phoneNumber, imgSrc } = req.body;

//     models.BioData.findByPk(tableId).then(result => {
//         if (!result) {
//             return res.status(404).json({
//                 message: "BioData not found"
//             });
//         }

//         result.userId = userId;
//         result.nameWini = nameWini;
//         result.nameWFull = nameWFull;
//         result.birthdate = birthdate;
//         result.age = age;
//         result.roleId = roleId;
//         result.gender = gender;
//         result.address = address;
//         result.email = email;
//         result.bankNumber = bankNumber;
//         result.phoneNumber = phoneNumber;
//         result.imgSrc = imgSrc;

//         result.save().then(() => {
//             res.status(200).json({
//                 message: "BioData updated successfully",
//                 bioData: result
//             });
//         }
//         ).catch(error => {
//             res.status(500).json({
//                 message: "Something went wrong",
//                 error: error
//             });
//         });
//     }
//     ).catch(error => {
//         res.status(500).json({
//             message: "Something went wrong",
//             error: error
//         });
//     });
// }


//creat function to fetch Roles table
function showAllrole(req, res) {
    models.Role.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}






module.exports = {
    rsave: rsave,
    rshow: rshow,
    ridshow: ridshow,
    rupdate: rupdate,
    rdestroy: rdestroy,
    bssalaryAll: bssalaryAll,
    bsshow: bsshow,
    baIdshow: baIdshow,
    basave: basave,
    bashow: bashow,
    baupdate: baupdate,
    badelete: badelete,
    earningcal: earningcal,
    earningShow: earningShow,
    SaveUserTotalLoan: SaveUserTotalLoan,
    AddUserTotalLoan: AddUserTotalLoan,
    ShowUserTotalLoan: ShowUserTotalLoan,
    ShowUserTotalLoanById: ShowUserTotalLoanById,
    UpdateUserTotalLoan: UpdateUserTotalLoan,
    DeleteUserTotalLoan: DeleteUserTotalLoan,
    UserMonthLoan: UserMonthLoan,
    UserMonthLoanShow: UserMonthLoanShow,
    MonthEpfEtf: MonthEpfEtf,
    MonthEpfEtfShow: MonthEpfEtfShow,
    Deduction: Deduction,
    DeductionShow: DeductionShow,
    FoodAllowanSave: FoodAllowanSave,
    FoodAllowanceShow: FoodAllowanceShow,
    FoodAllowanceShowId: FoodAllowanceShowId,
    FoodAllowanceUpdate: FoodAllowanceUpdate,
    FoodAllowanceDelete: FoodAllowanceDelete,
    MonthFoodAllowance: MonthFoodAllowance,
    MonthFoodAllowanceShow: MonthFoodAllowanceShow,
    RoleOTIncomeSave: RoleOTIncomeSave,
    RoleOTIncomeShow: RoleOTIncomeShow,
    RoleOTIncomeShowById: RoleOTIncomeShowById,
    RoleOTIncomeUpdate: RoleOTIncomeUpdate,
    RoleOTIncomeDelete: RoleOTIncomeDelete,
    MonthOT: MonthOT,
    MonthOTShow: MonthOTShow,
    Additions: Additions,
    AdditionsShow: AdditionsShow,
    UserNetPay: UserNetPay,
    UserNetPayShow: UserNetPayShow,
    MonthSalarySheet: MonthSalarySheet,
    MonthSalarySheetShow: MonthSalarySheetShow,
    MonthSalarySheetIdShowID: MonthSalarySheetIdShowID,
    SubTotalMonthSalarySheet: SubTotalMonthSalarySheet,
    SubTotalMonthSalarySheetShow: SubTotalMonthSalarySheetShow,
    AllMonthSalarySheet: AllMonthSalarySheet,
    AllMonthSalarySheetShow: AllMonthSalarySheetShow,
    AllMonthSalarySheetIdShow: AllMonthSalarySheetIdShow,
    showAllrole: showAllrole,

    // BioDataSave: BioDataSave,
    BioDataShowId: BioDataShowId,
    BioDataShowUserId: BioDataShowUserId,
    // BioDataShow: BioDataShow,
    // BioDataDelete: BioDataDelete,
    // BioDataUpdate: BioDataUpdate

    



};


