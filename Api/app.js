const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());


const usersRouter = require('./routes/user');
const testRouter = require('./routes/tests');

const adminProductController = require('./routes/admin_product');

app.use('/adminproduct', adminProductController);
app.use ("/users", usersRouter);
app.use('/tests', testRouter);




module.exports = app;