'use strict'
const mongoose = require('mongoose');
const Customer = require('../models/CustomerModel');

//List all Customers
exports.get = async(data) => {
    var res = await Customer.find({}, 'name email');
    return res;
}
//List all Customers

//Create Customer
exports.create = async (data) => {
    var customer = new Customer(data);
    await customer.save();
};
//Create Customer

exports.authenticate = async(data) => {
    const res = await Customer.findOne({
        email: data.email,
        password: data.password
    });
    return res;
}

exports.getById = async(id) => {
    const res = await Customer.findById(id);
    return res;
}