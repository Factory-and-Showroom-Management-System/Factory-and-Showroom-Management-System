const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());



const UserRoute = require('./routes/UserRoute');

app.use(bodyParser.json());

app.use ("/users", UserRoute);


module.exports = app;