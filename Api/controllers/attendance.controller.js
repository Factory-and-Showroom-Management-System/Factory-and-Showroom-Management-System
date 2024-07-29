const moment = require('moment');
const Validator = require('fastest-validator');
const models = require('../models');
const ExcelJS = require('exceljs');

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

        const attendance = await models.Attendance.create({
            userId: req.body.userId,
            name: req.body.name,
            role: req.body.role,
            dateIn: moment(req.body.dateIn).format('YYYY-MM-DD'),
            timeIn: req.body.timeIn ? moment(req.body.timeIn, 'hh:mm:ss ').format('hh:mm:ss ') : null,
            timeOut: req.body.timeOut ? moment(req.body.timeOut, 'hh:mm:ss ').format('hh:mm:ss ') : null,
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
        const attendance = await models.Attendance.findAll({
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

        const [attendance, created] = await models.Attendance.findOrCreate({
            where: { userId: userId },
            defaults: { role: roleName, name: nameWini, dateIn: new Date(), timeIn: timeIn ? moment(timeIn, 'hh:mm:ss ').format('hh:mm:ss ') : null, timeOut: timeOut ? moment(timeOut, 'hh:mm:ss ').format('hh:mm:ss ') : null, status: status }
        });

        if (!created) {
            // Attendance record already exists, update roleName, name, timeIn, and timeOut
            await attendance.update({ role: roleName, name: nameWini, timeIn: timeIn ? moment(timeIn, 'hh:mm:ss ').format('hh:mm:ss ') : attendance.timeIn, timeOut: timeOut ? moment(timeOut, 'hh:mm:ss ').format('hh:mm:ss ') : attendance.timeOut, status: status });
        }
    } catch (error) {
        console.error('Error updating or creating attendance:', error);
    }
}

// Function to update timeIn and timeOut
async function updateTimeInAndOut(req, res) {
    try {
        const attendance = await models.Attendance.findOne({
            where: {
                userId: req.body.userId,
            },
        });

        if (!attendance) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }

        let status = 'Absent';
        if (req.body.timeIn && req.body.timeOut) {
            status = 'Present';
        }

        await attendance.update({
            timeIn: req.body.timeIn ? moment(req.body.timeIn, 'hh:mm:ss ').format('hh:mm:ss ') : attendance.timeIn,
            timeOut: req.body.timeOut ? moment(req.body.timeOut, 'hh:mm:ss ').format('hh:mm:ss ') : attendance.timeOut,
            status: status
        });

        res.status(200).json({ message: 'Attendance updated successfully', attendance });
    } catch (error) {
        console.error('Error in updateTimeInAndOut function:', error);
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
}



async function generateReport(req, res) {
    try {
        const attendance = await models.Attendance.findAll({
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

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Attendance Report');

        worksheet.columns = [
            { header: 'User ID', key: 'userId', width: 10 },
            { header: 'Name', key: 'name', width: 30 },
            { header: 'Role', key: 'role', width: 20 },
            { header: 'Date In', key: 'dateIn', width: 15 },
            { header: 'Time In', key: 'timeIn', width: 15 },
            { header: 'Time Out', key: 'timeOut', width: 15 },
            { header: 'Status', key: 'status', width: 10 },
        ];

        attendance.forEach(record => {
            worksheet.addRow({
                userId: record.userId,
                name: record.name,
                role: record.role,
                dateIn: moment(record.dateIn).format('YYYY-MM-DD'),
                timeIn: record.timeIn,
                timeOut: record.timeOut,
                status: record.status,
            });
        });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=attendance_report.xlsx');

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error('Error in generateReport function:', error);
        res.status(500).json({ message: 'Something went wrong', error });
    }
}

const resetDailyAttendance = async (req, res) => {
    try {
        const currentDate = new Date();
        await models.attendance.update(
            {
                dateIn: currentDate,
                timeIn: null,
                timeOut: null,
                status: 'Absent'
            },
            {
                where: {}
            }
        );
        res.status(200).json({ message: 'Attendance records reset successfully' });
    } catch (error) {
        console.error('Error in resetDailyAttendance function:', error);
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

module.exports = {
    save,
    updateOrCreateAttendance,
    updateTimeInAndOut, // Exporting the new function
    attendanceShow,
    generateReport,
    resetDailyAttendance
};
