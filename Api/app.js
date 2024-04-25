const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());




const usersRouter = require('./routes/user');
const testRouter = require('./routes/tests');
const attendanceRouter = require('./routes/attendance');
const salaryRouter = require('./routes/salary');



 

app.use('/user', usersRouter);
app.use('/tests', testRouter);
app.use('/attendance', attendanceRouter);
app.use('/salary', salaryRouter);




module.exports = app;