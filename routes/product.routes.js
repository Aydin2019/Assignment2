const express = require('express');
const router = express.Router();
const products = require('../controllers/product.controller');

// Create a new Product
router.post('/products', products.create);

// Retrieve all Products
router.get('/products', products.findAll);

// Retrieve a single Product with id
router.get('/products/:id', products.findOne);

// Update a Product with id
router.put('/products/:id', products.update);

// Delete a Product with id
router.delete('/products/:id', products.delete);

// Delete all Products
router.delete('/products', products.deleteAll);

module.exports = router;
