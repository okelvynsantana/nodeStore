'use strict'
const mongoose = require('mongoose');
const Product = require('../models/productModel');

exports.post = (req, res, next) => {
    var product = new Product();
    product.title = req.body.title;
    product.slug = req.body.slug;
    product.description = req.body.description;
    product.price = req.body.price;
    product.active = req.body.active;
    product.tags = req.body.tags;

    product
        .save()
        .then(x => {
            res.status(201).send({ message: 'Produto criado com sucesso!' });
        }).catch(e => {
            res.status(400).send({ 
                message: 'Falha ao criar o produto.', 
                data: e 
            });
        });

    
};//CREATE PRODUCT

exports.put = (req, res, next) => {
    const id = req.params.id;
    res.status(200).send({
        id: id,
        item: req.body
    });
};// UPDATE

exports.delete = (req, res, next) => {
    res.status(200).send(req.body);
};// DELETE