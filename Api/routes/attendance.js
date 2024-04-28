const express = require('express');
const attendanceController = require('../controllers/attendance.controller');

const router = express.Router();

router.post('/addattendance', attendanceController.save);
router.get('/showattendance', attendanceController.show);
router.get('/showattendance/:userId', attendanceController.showId);
router.get('/countpresent/:userId', attendanceController.countPresent);
router.put('/updateattendance/:attendanceId', attendanceController.update);
router.delete('/deleteattendance/:attendanceId', attendanceController.destroy);


module.exports = router;
