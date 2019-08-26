'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/OrderController');
const authenticate = require('../services/authService')

router.get('/', authenticate.authorize, controller.get);
router.post('/', authenticate.authorize ,controller.post);

module.exports = router;