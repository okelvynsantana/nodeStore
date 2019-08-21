'use stric'
//Imports
const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');
//Imports

//CRUD Products
router.get('/', controller.get); //List all products.
router.get('/:slug', controller.getBySlug); //List products by slug.
router.get('/admin/:id', controller.getById); //List products by Id.
router.get('/tags/:tags', controller.getByTag); //List Products by Tag.
router.post('/', controller.post); //Create Product.
router.put('/:id', controller.put); // Update Product.
router.delete('/', controller.delete);//Delete Product.
//CRUD Products

module.exports = router;