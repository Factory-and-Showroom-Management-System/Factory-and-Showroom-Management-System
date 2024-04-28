const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());




const usersRouter = require('./routes/user');
const testRouter = require('./routes/tests');
const attendanceRouter = require('./routes/attendance');
//salary
const salaryRouter = require('./routes/salary');
//order
const orderRouter = require('./routes/order');
//customer
const customerRouter = require('./routes/customer');
//product
const productRouter = require('./routes/product');




 

app.use('/user', usersRouter);
app.use('/tests', testRouter);
app.use('/attendance', attendanceRouter);
app.use('/salary', salaryRouter);
//order
app.use('/order', orderRouter);
//customer
app.use('/customer', customerRouter);
//product
app.use('/product', productRouter);



module.exports = app;