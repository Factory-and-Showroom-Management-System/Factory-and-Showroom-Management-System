const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());



const UserRoute = require('./routes/UserRoute');
const dashboardRoutes = require('./routes/dashboard');
const attendanceRouter = require('./routes/attendance');
app.use(bodyParser.json());

app.use ("/users", UserRoute);
app.use ("/attendance", attendanceRouter);

// app.use ("/dashboard", dashboardRoutes);

module.exports = app;