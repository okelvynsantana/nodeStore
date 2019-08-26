'use strict';
const config = require('../config');
const sendgrid = require('sendgrid')(config.sendGridKey);

exports.send = async (to, subject, body) => {
    sendgrid.send({
        to: to,
        from: 'contato@doublepeppers.com.br',
        subject: subject,
        html: body
    })
}