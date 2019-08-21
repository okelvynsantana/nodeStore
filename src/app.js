'use strict'
//Imports
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const mongoose = require('mongoose');
//Imports

//Load Application Routes
const indexRoute = require('./routes/indexRoutes');
const productRoute = require('./routes/productRoutes');
//Load Application Routes

//Data Base Connect
mongoose.connect('mongodb+srv://doublepeppers:kss046dp@doublepeppers-tswtt.azure.mongodb.net/nodestr?retryWrites=true&w=majority');
//Data Base Connect

//Body Parser
app.use(bodyParser.json());
app.unsubscribe(bodyParser.urlencoded({ 
    extended: false 
}));
//Body Parser

//Load Application Models
const Product = require('./models/productModel');
//Load Application Models

//Application Routes
app.use('/', indexRoute);
app.use('/products', productRoute);
//Application Routes

module.exports = app;