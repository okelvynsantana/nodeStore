'use stric'
//Imports
const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');
const authService = require('../services/authService')
//Imports

//CRUD Products
router.get('/', controller.get); //List all products.
router.get('/:slug', controller.getBySlug); //List products by slug.
router.get('/admin/:id', controller.getById); //List products by Id.
router.get('/tags/:tag', controller.getByTag); //List Products by Tag.
router.post('/', authService.isAdmin, controller.post); //Create Product.
router.put('/:id', authService.isAdmin, controller.put); // Update Product.
router.delete('/:id', authService.isAdmin, controller.delete);//Delete Product.
//CRUD Products

module.exports = router;