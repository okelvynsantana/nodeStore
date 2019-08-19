'use strict'
// IMPORTS
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
//FINAL IMPORTS

//LOAD ROUTES
const indexRoute = require('./routes/indexRoutes');
const productRoute = require('./routes/productRoutes');

//BODY PARSER
app.use(bodyParser.json());
app.unsubscribe(bodyParser.urlencoded({ 
    extended: false 
}));

//ROUTES
app.use('/', indexRoute);
app.use('/products', productRoute);


module.exports = app;