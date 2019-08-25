'use strict';
const mongoose = require('mongoose');
const Order = require('../models/OrderModel');

//List Orders
exports.get = async(data) => {
    var res = await Order
        .find({}, 'orderNumber status customer items')
        .populate('customer', 'name email')
        .populate('items.product', 'title')
    return res;
}

//List Orders

//Create Order
exports.create = async(data) => {
    let order = new Order(data);
    await order.save();
}
// Create Order