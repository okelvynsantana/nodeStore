'use strict';

const repository = require('../repositories/OrderRepository');
const guid = require('guid');
const authService = require('../services/authService');

exports.get = async(req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.post = async (req, res, next) => {
    try {
        //Recupera o token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        //Decodifica o Token
        const data = await authService.decodeToken(token);

        await repository.create({
            customer: data.id,
            orderNumber: guid.raw().substring(0, 6),
            items: req.body.items
        });
        res.status(201).send({
            message: "Pedido criado com sucesso"
        })
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição.'
        })
    }
}