const moment = require('moment-timezone')
const cron = require('node-cron');
const Validator = require('fastest-validator');
const models = require('../models');
const ExcelJS = require('exceljs');
const { Op } = require('sequelize');

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

        let status = req.body.timeOut ? 'Present' : 'Absent';

        const attendance = await models.Attendance.create({
            userId: req.body.userId,
            name: req.body.name,
            role: req.body.role,
            dateIn: moment().tz('Asia/Colombo').format('YYYY-MM-DD'),  // Use startOf('day')
            timeIn: req.body.timeIn ? moment(req.body.timeIn, 'HH:mm:ss').utc().format('HH:mm:ss') : null,
            timeOut: req.body.timeOut ? moment(req.body.timeOut, 'HH:mm:ss').format('HH:mm:ss') : null,
            status: status,
        });

        res.status(201).json({ message: 'Attendance created successfully', attendance });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
}

// Helper function to get attendance records
async function getAttendanceRecords() {
    try {
        const attendanceRecords = await models.Attendance.findAll({
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

        // Flatten the data structure for easier use
        const flattenedAttendance = attendanceRecords.map(record => ({
            userId: record.userId,
            name: record.name,
            role: record.role,
            dateIn: record.dateIn,
            timeIn: record.timeIn,
            timeOut: record.timeOut,
            status: record.status
        }));

        return flattenedAttendance;
    } catch (error) {
        console.error('Error fetching attendance records:', error);
        throw error;
    }
}

// Original attendanceShow function for API response
async function attendanceShow(req, res) {
    try {
        const attendanceData = await getAttendanceRecords();
        res.status(200).json(attendanceData);
    } catch (error) {
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
            defaults: { role: roleName, name: nameWini, dateIn: new Date(), timeIn: timeIn ? moment(timeIn, 'hh:mm:ss').format('hh:mm:ss') : null, timeOut: timeOut ? moment(timeOut, 'hh:mm:ss').format('hh:mm:ss') : null, status: status }
        });

        if (!created) {
            // Attendance record already exists, update roleName, name, timeIn, and timeOut
            await attendance.update({ role: roleName, name: nameWini, timeIn: timeIn ? moment(timeIn, 'hh:mm:ss').format('hh:mm:ss') : attendance.timeIn, timeOut: timeOut ? moment(timeOut, 'hh:mm:ss').format('hh:mm:ss') : attendance.timeOut, status: status });
        }
    } catch (error) {
        console.error('Error updating or creating attendance:', error);
    }
}

// Function to update timeIn and timeOut
async function updateTimeInAndOut(req, res) {
    try {
        const { userId, dateIn, timeIn, timeOut } = req.body;
        const attendance = await models.Attendance.findOne({ where: { userId } });

        if (!attendance) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }

        let status = attendance.status; // Retain the current status by default

        // Determine the status based on timeIn and timeOut
        if (timeIn !== undefined && timeOut !== undefined) {
            status = (timeIn && timeOut) ? 'Present' : 'Absent';
        }

        await attendance.update({        
            dateIn: dateIn !== undefined ? moment(dateIn, 'YYYY-MM-DD').format('YYYY-MM-DD') : attendance.dateIn,
            timeIn: timeIn !== undefined ? (timeIn !== null ? moment(timeIn, 'HH:mm:ss').format('HH:mm:ss') : null) : attendance.timeIn,
            timeOut: timeOut !== undefined ? (timeOut !== null ? moment(timeOut, 'HH:mm:ss').format('HH:mm:ss') : null) : attendance.timeOut,
            status: status,
        });

        res.status(200).json({ message: 'Attendance updated successfully', attendance });
    } catch (error) {
        console.error('Error updating time in and out:', error);
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

// Archive Attendance Function
async function archiveAttendance(req, res) {
    try {
        const { startDate, endDate } = req.query;

        const attendanceRecords = await models.Attendance.findAll({
            where: {
                dateIn: {
                    [Op.between]: [startDate, endDate]
                }
            }
        });

        if (!attendanceRecords || attendanceRecords.length === 0) {
            return res.status(404).json({ message: 'No attendance records found for the specified date range' });
        }

        const archivedRecords = attendanceRecords.map(record => {
            if (!record || typeof record.status === 'undefined') {
                console.warn(`Skipping invalid record for userId: ${record?.userId || 'unknown'}`);
                return null; // Skip this record if it's invalid
            }
            return {
                userId: record.userId,
                name: record.name,
                role: record.role,
                dateIn: record.dateIn,
                timeIn: record.timeIn,
                timeOut: record.timeOut,
                status: record.status,
            };
        }).filter(record => record !== null); // Filter out any null values

        if (archivedRecords.length === 0) {
            return res.status(404).json({ message: 'No valid attendance records found for archiving' });
        }

        // Bulk insert into ArchiveAttendance
        await models.ArchiveAttendance.bulkCreate(archivedRecords);

        // Delete old records
        await models.Attendance.destroy({
            where: {
                dateIn: {
                    [Op.between]: [startDate, endDate]
                }
            }
        });

        res.status(200).json({ message: 'Attendance records archived successfully' });
    } catch (error) {
        console.error('Error archiving attendance:', error);
        res.status(500).json({ message: 'Something went wrong', error });
    }
}

// Cron job to archive attendance daily at midnight
cron.schedule('0 0 * * *', async () => {
    const startDate = moment().tz('Asia/Colombo').subtract(1, 'day').startOf('day').format('YYYY-MM-DD');
    const endDate = moment().tz('Asia/Colombo').subtract(1, 'day').endOf('day').format('YYYY-MM-DD');
    
    
    await archiveAttendance({
        query: { startDate, endDate }
    });
});


// Function to retrieve archived attendance data by date
async function getArchivedAttendance(req, res) {
    try {
        const { startDate, endDate } = req.query;

        const archivedAttendance = await models.ArchiveAttendance.findAll({
            where: {
                dateIn: {
                    [Op.between]: [startDate, endDate]
                }
            }
        });

        if (!archivedAttendance || archivedAttendance.length === 0) {
            return res.status(404).json({ message: 'No archived attendance records found for the specified date range' });
        }

        res.status(200).json(archivedAttendance);
    } catch (error) {
        console.error('Error fetching archived attendance:', error);
        res.status(500).json({ message: 'Something went wrong', error });
    }
}


// Existing cron job to update or create attendance every minute
// cron.schedule('* * * * *', async () => {
//     try {
//         console.log('Cron job running every minute to update attendance');

//         // Fetch all users from BioData
//         const bioDataRecords = await models.BioData.findAll();

//         for (const bioData of bioDataRecords) {
//             const { userId, nameWini, roleId } = bioData;

//             // Get the role name using the roleId
//             const role = await models.Role.findByPk(roleId);
//             if (role) {
//                 const roleName = role.roleName;

//                 // Call the updateOrCreateAttendance function to update attendance
//                 await updateOrCreateAttendance(userId, roleName, nameWini, moment().format('HH:mm:ss'), null);
//             }
//         }
//     } catch (error) {
//         console.error('Error running cron job:', error);
//     }
// });

// Cron job to update timeIn and timeOut every minute
cron.schedule('0 0 * * *', async () => {
    try {
        console.log('Cron job running at midnight to update dateIn');

        // Fetch all bioData records
        const bioDataRecords = await models.BioData.findAll();

        // Loop through each record and update dateIn to current date
        for (const bioData of bioDataRecords) {
            const { userId } = bioData;

            // Set dateIn to the current date (midnight)
            console.log("Server current date and time:", new Date());
            const dateIn = moment().tz('Asia/Colombo').startOf('day').format('YYYY-MM-DD');
            const timeIn = null; // Optionally reset timeIn and timeOut to null
            const timeOut = null;

            // Update timeIn, timeOut, and dateIn using your updateTimeInAndOut function
            await updateTimeInAndOut(
                { body: { userId, dateIn, timeIn, timeOut } },
                { status: () => {} } // Mocking the response object
            );
        }
    } catch (error) {
        console.error('Error running cron job for dateIn update:', error);
    }
});


// Cron job to log attendance records daily at 12:00 PM
cron.schedule('0 0 * * *', async () => {
    try {
        console.log('Running cron job to log attendance records...');
        
        const attendanceData = await getAttendanceRecords();
        
        // Log the attendance data (you can customize this to save to a file or database)
        console.log('Attendance Data:', JSON.stringify(attendanceData, null, 2));
        
    } catch (error) {
        console.error('Error in cron job logging attendance:', error);
    }
});


// Function to retrieve archived attendance data by date
async function getArchivedAttendanceByDate(req, res) {
    try {
        const { startDate, endDate } = req.query;

        const archivedAttendance = await models.ArchiveAttendance.findAll({
            where: {
                dateIn: {
                    [Op.between]: [startDate, endDate]
                }
            },
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

        res.status(200).json(archivedAttendance);
    } catch (error) {
        console.error('Error fetching archived attendance:', error);
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
}


// Function to calculate total monthly attendance
async function getTotalMonthlyAttendance(req, res) {
    try {
        const { year, month } = req.query;

        // Validate input
        if (!year || !month) {
            return res.status(400).json({ message: 'Year and month are required' });
        }

        // Calculate the start and end dates for the month
        const startDate = moment(`${year}-${month}-01`).startOf('month').format('YYYY-MM-DD');
        const endDate = moment(startDate).endOf('month').format('YYYY-MM-DD');

        // Fetch attendance records for the month from ArchiveAttendance
        const attendanceRecords = await models.ArchiveAttendance.findAll({
            where: {
                dateIn: {
                    [Op.between]: [startDate, endDate],
                },
                status: 'Present',  // Ensure you are filtering by the 'Present' status
            },
        });

        // Calculate total attendance
        const totalAttendance = attendanceRecords.length;

        res.status(200).json({ totalAttendance });
    } catch (error) {
        console.error('Error calculating total monthly attendance:', error);
        res.status(500).json({ message: 'Something went wrong', error });
    }
}


async function getTotalDailyAttendance(req, res) {
    try {
        const { year, month, date } = req.query; // Fetch year, month, date from query parameters

        if (!year || !month || !date) {
            return res.status(400).json({ message: 'Year, month, and date parameters are required' });
        }

        // Construct the date from year, month, and date
        const formattedDate = `${year}-${month}-${date}`;

        const dailyAttendanceRecords = await models.ArchiveAttendance.findAll({
            where: {
                [Op.and]: [
                    models.sequelize.where(
                        models.sequelize.fn('DATE_FORMAT', models.sequelize.col('dateIn'), '%Y-%m-%d'),
                        formattedDate
                    ),
                    { status: 'Present' }
                ]
            }
        });

        // Calculate total attendance
        const totalDailyAttendance = dailyAttendanceRecords.length;

        res.status(200).json({ totalDailyAttendance });
    } catch (error) {
        console.error('Error calculating total daily attendance:', error);
        res.status(500).json({ message: 'Something went wrong', error });
    }
}


async function getAverageArchivedAttendance(req, res) {
    try {
        let { startDate, endDate } = req.query;

        // If no startDate and endDate are provided, use current month range
        if (!startDate || !endDate) {
            const now = moment(); // Current date and time
            startDate = now.startOf('month').format('YYYY-MM-DD');
            endDate = now.endOf('month').format('YYYY-MM-DD');
        }

        // Fetch attendance records within the specified date range
        const archivedAttendanceRecords = await models.ArchiveAttendance.findAll({
            where: {
                dateIn: {
                    [Op.between]: [startDate, endDate],
                },
            },
            include: [
                {
                    model: models.BioData,
                    as: 'BioData',
                    attributes: ['nameWini'], // Fetch the short name of the user
                },
            ],
        });

        if (!archivedAttendanceRecords.length) {
            return res.status(404).json({ message: 'No archived attendance records found in the specified range' });
        }

        // Create a map to store the total and present counts for each user
        const attendanceMap = archivedAttendanceRecords.reduce((acc, record) => {
            // Use BioData.nameWini to get the name
            const nameWini = record.BioData ? record.BioData.nameWini : 'Unknown'; // Handle null BioData
            if (!acc[nameWini]) {
                acc[nameWini] = { total: 0, present: 0 };
            }
            acc[nameWini].total += 1;
            if (record.status === 'Present') {
                acc[nameWini].present += 1;
            }
            return acc;
        }, {});

        // Calculate the average attendance for each user
        const averages = Object.keys(attendanceMap).map(nameWini => ({
            name: nameWini,
            averageAttendance: (attendanceMap[nameWini].present / attendanceMap[nameWini].total) * 100,
        }));

        res.status(200).json({ averages });
    } catch (error) {
        console.error('Error calculating average archived attendance:', error);
        res.status(500).json({ message: 'Something went wrong', error });
    }
}


module.exports = {
    save,
    updateOrCreateAttendance,
    updateTimeInAndOut, // Exporting the new function
    attendanceShow,
    generateReport,
    // archiveAttendance,
    getArchivedAttendance,
    getArchivedAttendanceByDate,
    getTotalMonthlyAttendance,
    getTotalDailyAttendance,
    getAverageArchivedAttendance,
};
