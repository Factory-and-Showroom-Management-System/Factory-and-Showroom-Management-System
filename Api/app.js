const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());


const usersRouter = require('./routes/user');
const testRouter = require('./routes/tests');
const adminProductController = require('./routes/admin_product');
const inventoryProductController = require('./routes/inventory_product');
const adminMaterialController = require('./routes/admin_material');

app.use('/adminproduct', adminProductController);
app.use ("/users", usersRouter);
app.use('/tests', testRouter);
app.use('/inventoryproduct', inventoryProductController);
app.use('/adminmaterial', adminMaterialController);




module.exports = app;