const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));


const bioDataRouter = require('./routes/biodata');
const attendanceRouter = require('./routes/attendance');
const usersRouter = require('./routes/user');
const testRouter = require('./routes/tests');

const orderRouter = require('./routes/order');
const customerRouter = require('./routes/customer');
const productRouter = require('./routes/product');
const machineRouter = require('./routes/machine');



// const attendanceRouter = require('./routes/attendance');
// const salaryRouter = require('./routes/salary');

const adminProductController = require('./routes/admin_product');
const inventoryProductController = require('./routes/inventory_product');
const adminMaterialController = require('./routes/admin_material');

// const attendanceRouter = require('./routes/attendance');
const salaryRouter = require('./routes/salary');

app.use('/biodata', bioDataRouter);
app.use('/attendance', attendanceRouter);
// app.use('/salary', salaryRouter);

app.use('/adminproduct', adminProductController);
app.use ("/users", usersRouter);
app.use('/tests', testRouter);

app.use('/order', orderRouter);
app.use('/customer', customerRouter);
app.use('/product', productRouter);
app.use('/machine', machineRouter);


app.use('/inventoryproduct', inventoryProductController);
app.use('/adminmaterial', adminMaterialController);


// app.use('/attendance', attendanceRouter);
app.use('/salary', salaryRouter);




module.exports = app;