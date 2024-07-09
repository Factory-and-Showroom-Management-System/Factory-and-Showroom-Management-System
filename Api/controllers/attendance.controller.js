const moment = require('moment');
const Validator = require('fastest-validator');
const models = require('../models');

// Create function to save attendance Time In
async function save(req, res) {
    try {
        const bioData = await models.BioData.findOne({
            where: {
                userId: req.body.userId,
            },
        });

        if (!bioData) {
            return res.status(404).json({ message: 'BioData not found' });
        }

        let status = 'Absent';
        if (req.body.timeOut) {
            status = 'Present';
        }

        const attendance = await models.attendance.create({
            userId: req.body.userId,
            name: req.body.name,
            role: req.body.role,
            dateIn: moment(req.body.dateIn).format('YYYY-MM-DD'),
            timeIn: moment(req.body.timeIn, 'HH:mm:ss').format('HH:mm:ss'),
            timeOut: req.body.timeOut ? moment(req.body.timeOut, 'HH:mm:ss').format('HH:mm:ss') : null,
            status: status,
        });

        res.status(201).json({ message: 'Attendance created successfully', attendance });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
}

// Show all attendance records
async function attendanceShow(req, res) {
    try {
        const attendance = await models.attendance.findAll({
            include: [
                {
                    model: models.BioData,
                    as: 'BioData',
                    include: [
                        {
                            model: models.Role,
                            as: 'role',
                            attributes: ['roleName']
                        }
                    ]
                }
            ]
        });
        res.status(200).json(attendance);
    } catch (error) {
        console.error('Error in attendanceShow function:', error);
        res.status(500).json({ message: 'Something went wrong', error });
    }
}

// Function to update or create Attendance record
async function updateOrCreateAttendance(userId, roleName, nameWini, timeIn = null, timeOut = null) {
    try {
        let status = 'Absent';
        if (timeOut) {
            status = 'Present';
        }

        const [attendance, created] = await models.attendance.findOrCreate({
            where: { userId: userId },
            defaults: { role: roleName, name: nameWini, dateIn: new Date(), timeIn: timeIn, timeOut: timeOut, status: status }
        });

        if (!created) {
            // Attendance record already exists, update roleName, name, timeIn, and timeOut
            await attendance.update({ role: roleName, name: nameWini, timeIn: timeIn, timeOut: timeOut, status: status });
        }
    } catch (error) {
        console.error('Error updating or creating attendance:', error);
    }
}

// Function to update timeIn and timeOut
async function updateTimeInAndOut(req, res) {
    try {
        const attendance = await models.attendance.findOne({
            where: {
                userId: req.body.userId,
            },
        });

        if (!attendance) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }

        let status = 'Absent';
        if (req.body.timeOut) {
            status = 'Present';
        }

        await attendance.update({
            timeIn: moment(req.body.timeIn, 'HH:mm:ss').format('HH:mm:ss'),
            timeOut: req.body.timeOut ? moment(req.body.timeOut, 'HH:mm:ss').format('HH:mm:ss') : null,
            status: status
        });

        res.status(200).json({ message: 'Attendance updated successfully', attendance });
    } catch (error) {
        console.error('Error in updateTimeInAndOut function:', error);
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
}

module.exports = {
    save,
    updateOrCreateAttendance,
    updateTimeInAndOut, // Exporting the new function
    attendanceShow
};
