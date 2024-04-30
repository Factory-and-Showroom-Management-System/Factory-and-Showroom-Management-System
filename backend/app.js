const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());



const UserRoute = require('./routes/UserRoute');

const ProductRoute = require('./routes/product');
const OrderRoute = require('./routes/order');
const CustomerRoute = require('./routes/customer');


app.use(bodyParser.json());

app.use ("/users", UserRoute);

app.use ("/products", ProductRoute);
app.use ("/orders", OrderRoute);
app.use ("/customers", CustomerRoute);


module.exports = app;