'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/CustomerController');

router.get('/', controller.get);
router.post('/', controller.post ); //Create Customer


module.exports = router;

