const moment = require('moment');
const Validator = require('fastest-validator');
const models = require('../models');

// Create function to save attendance
function save(req, res) {
  const attendance = {
    name: req.body.name,
    userId: req.body.userId,
    role: req.body.role,
    dateIn: moment().format('YYYY-MM-DD'), // Set dateIn to current date
    timeIn: req.body.timeIn,
    timeOut: req.body.timeOut,
    status: req.body.status
  };

  // Validation schema
  const schema = {
    name: { type: "string", optional: false, max: "100" },
    userId: { type: "number", optional: false, max: 100 },
    role: { type: "string", optional: false, max: "100" },
    dateIn: { type: "string", optional: false }, // Change type to string
    timeIn: { type: "string", optional: false, pattern: /^(0?[1-9]|1[0-2]):[0-5][0-9]:[0-5][0-9] (AM|PM)$/ }, // Regex pattern for HH:MM:SS AM/PM format
    timeOut: { type: "string", optional: true, pattern: /^(0?[1-9]|1[0-2]):[0-5][0-9]:[0-5][0-9] (AM|PM)$/ }, // Regex pattern for HH:MM:SS AM/PM format
    status: { type: "string", optional: false, max: "100" }
  };

  // Create a validator instance
  const v = new Validator();
  const validationResponse = v.validate(attendance, schema);

  // Check if validation failed
  if (validationResponse !== true) {
    return res.status(400).json({
      message: "Validation failed",
      errors: validationResponse
    });
  }

  // Convert timeIn and timeOut to HH:MM:SS format
  attendance.timeIn = moment(attendance.timeIn, 'hh:mm:ss A').format('HH:mm:ss');
  if (attendance.timeOut) {
    attendance.timeOut = moment(attendance.timeOut, 'hh:mm:ss A').format('HH:mm:ss');
  }

  // Save attendance
  models.Attendance.create(attendance).then(result => {
    res.status(201).json({
      message: "Attendance created successfully",
      attendance: result
    });
  }).catch(error => {
    res.status(500).json({
      message: "Something went wrong",
      error: error
    });
  });
}

// Create function to show all attendance data------------------------------------------
function show(req, res) {
  models.Attendance.findAll().then(result => {
    res.status(200).json(result);
  }).catch(error => {
    res.status(500).json({
      message: "Something went wrong",
      error: error
    });
  });
}

// Create function to show userId attendance data-------------------------------------------
function showId(req, res) {
    models.Attendance.findAll({
      where: {
        userId: req.params.userId
      }
    }).then(result => {
      res.status(200).json(result);
    }).catch(error => {
      res.status(500).json({
        message: "Something went wrong",
        error: error
      });
    });
  } 

// Create function to update attendance data-------------------------------------------
function update(req, res) {
    const attendanceId = req.params.attendanceId;
    const updatedAttendance = {
      name: req.body.name,
      userId: req.body.userId,
      role: req.body.role,
      dateIn: req.body.dateIn,
      timeIn: req.body.timeIn,
      timeOut: req.body.timeOut,
      status: req.body.status
    };
  
    // Validation schema
    const schema = {
      name: { type: "string", optional: false, max: "100" },
      userId: { type: "number", optional: false, max: 100 },
      role: { type: "string", optional: false, max: "100" },
      dateIn: { type: "string", optional: false }, // Change type to string
      timeIn: { type: "string", optional: false, pattern: /^(0?[1-9]|1[0-2]):[0-5][0-9]:[0-5][0-9] (AM|PM)$/ }, // Regex pattern for HH:MM:SS AM/PM format
      timeOut: { type: "string", optional: true, pattern: /^(0?[1-9]|1[0-2]):[0-5][0-9]:[0-5][0-9] (AM|PM)$/ }, // Regex pattern for HH:MM:SS AM/PM format
      status: { type: "string", optional: false, max: "100" }
    };
  
    // Create a validator instance
    const v = new Validator();
    const validationResponse = v.validate(updatedAttendance, schema);
  
    // Check if validation failed
    if (validationResponse !== true) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validationResponse
      });
    }
  
    // Convert timeIn and timeOut to HH:MM:SS format
    updatedAttendance.timeIn = moment(updatedAttendance.timeIn, 'hh:mm:ss A').format('HH:mm:ss');
    if (updatedAttendance.timeOut) {
      updatedAttendance.timeOut = moment(updatedAttendance.timeOut, 'hh:mm:ss A').format('HH:mm:ss');
    }
  
    // Update attendance
    models.Attendance.update(updatedAttendance, {
      where: {
        id: attendanceId
      }
    }).then(result => {
      res.status(200).json({
        message: "Attendance updated successfully",
        attendance: updatedAttendance
      });
    }).catch(error => {
      res.status(500).json({
        message: "Something went wrong",
        error: error
      });
    });

  }



// Create function to delete attendance data-------------------------------------------
function destroy(req, res) {
    const attendanceId = req.params.attendanceId;
  
    models.Attendance.destroy({
      where: {
        id: attendanceId
      }
    }).then(result => {
      res.status(200).json({
        message: "Attendance deleted successfully"
      });
    }).catch(error => {
      res.status(500).json({
        message: "Something went wrong",
        error: error
      });
    });
  }






// Function to count the number of "present" status entries for a userId in the attendance table within the current month-------------------------
function countPresent(req, res) {
    // Get the start date of the current month
    const startDate = moment().startOf('month');
    // Get the end date of the current month
    const endDate = moment().endOf('month');
  
    models.Attendance.count({
      where: {
        userId: req.params.userId,
        status: 'present',
        dateIn: {
          // Filter by the date range for the current month
          [models.Sequelize.Op.between]: [startDate, endDate]
        }
      }
    }).then(result => {
      res.status(200).json(result);
    }).catch(error => {
      res.status(500).json({
        message: "Something went wrong",
        error: error
      });
    });
  }


  
  module.exports = {
    save: save,
    show: show,
    showId: showId,
    countPresent: countPresent,
    update: update,
    destroy: destroy
  };
