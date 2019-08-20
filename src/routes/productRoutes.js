'use stric'
const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');

router.get('/', controller.get); //LIST ALL PRODUCTS.
router.post('/', controller.post); //PRODUCT CREATE.
router.put('/:id', controller.put); // PRODUCT UPDATE.
router.delete('/', controller.delete);//PRODUCT DELETE.


module.exports = router;