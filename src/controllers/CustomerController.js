'use strict';
const ValidationContract = require('../validators/fluentValidator');
const repository = require('../repositories/CustomerRepository');
const md5 = require('md5');

exports.get = async(rq, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição.'
        });
    }
};

//Creat Customer
exports.post = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'O nome deve ter pelo menos 3 caracteres.');
    contract.isEmail(req.body.email, 'Email inválido');
    contract.hasMinLen(req.body.password, 8, 'A senha deve ter pelo menos 8 caracteres');

    //Se os dados forem inválidos

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    };

    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });
        res.status(201).send({
            message: 'Usuário cadastrado com sucesso.'
        });
    } catch (e) {
        res.status(500).send(() => {
        });
    }
};
//Create Customer



