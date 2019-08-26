'use strict';
const ValidationContract = require('../validators/fluentValidator');
const repository = require('../repositories/CustomerRepository');
const md5 = require('md5');
const emailService = require('../services/emailService');
const authService = require('../services/authService');

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
            password: md5(req.body.password + global.SALT_KEY),
            roles: ["user"]
        });
        emailService
        .send(req.body.email, 
            'Seja bem vindo!', 
            global.EMAIL_TMPL
            .replace('{0}', req.body.name))

        res.status(201).send({
            message: 'Usuário cadastrado com sucesso.'
        });
    } catch (e) {
        res.status(500).send(() => {
        });
    }
};
//Create Customer

exports.authenticate = async(req, res, next) => {
    try {
        const customer = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password +global.SALT_KEY),
        });

        if(!customer) {
            res.status(404).send({
                message: 'Usuário ou senha inválidos'
            });
            return;
        }
        const token = await authService.generateToken({
            id: customer._id,
            email: customer.email, 
            name: customer.name,
            roles: customer.roles
        });
        res.status(201).send({
            token: token,
            data: {
                email: customer.email,
                name: customer.name
            }
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        })
    }
}

exports.refreshToken = async(req, res, next) => {
    try {

        //Recupera o token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        //Decodifica o Token
        const data = await authService.decodeToken(token);

        const customer = await repository.getById(data.id);

        if(!customer) {
            res.status(404).send({
                message: 'Cliente não encontrado'
            });
            return;
        }
        const tokenData = await authService.generateToken({
            id: customer._id,
            email: customer.email, 
            name: customer.name,
            roles:customer.roles
        });
        res.status(201).send({
            token: token,
            data: {
                email: customer.email,
                name: customer.name
            }
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        })
    }
}



