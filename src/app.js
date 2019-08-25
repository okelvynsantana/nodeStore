'use strict'
//Imports
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
const router = express.Router();

//Imports

//Load Application Routes
const indexRoute = require('./routes/indexRoutes');
const productRoute = require('./routes/productRoutes');
const customerRoute = require('./routes/CustomerRoutes');
const orderRoute = require('./routes/OrderRoutes');
//Load Application Routes

//Data Base Connect
mongoose.connect(config.connectionString);
//Data Base Connect

//Body Parser
app.use(bodyParser.json());
app.unsubscribe(bodyParser.urlencoded({ 
    extended: false 
}));
//Body Parser

//Load Application Models
const Product = require('./models/productModel');
const Customer = require('./models/CustomerModel')
const Order = require('./models/OrderModel');
//Load Application Models

//Application Routes
app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);
//Application Routes

module.exports = app;