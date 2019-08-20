'use strict'
// IMPORTS
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const mongoose = require('mongoose');
//FINAL IMPORTS

//LOAD ROUTES
const indexRoute = require('./routes/indexRoutes');
const productRoute = require('./routes/productRoutes');

//CONECTA O BANCO DE DADOS
mongoose.connect('mongodb+srv://doublepeppers:kss046dp@doublepeppers-tswtt.azure.mongodb.net/nodestr?retryWrites=true&w=majority')

//BODY PARSER
app.use(bodyParser.json());
app.unsubscribe(bodyParser.urlencoded({ 
    extended: false 
}));

//CARREGA OS MODELS
const Product = require('./models/productModel');

//ROUTES
app.use('/', indexRoute);
app.use('/products', productRoute);


module.exports = app;