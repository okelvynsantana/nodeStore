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
app.use(bodyParser.json({
    limit: '5mb'
}));
app.unsubscribe(bodyParser.urlencoded({ 
    extended: false 
}));
//Body Parser

//CORS
app.use(function(req, res,next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

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