const path = require('path');

const express = require('express');

const ProductsController = require('../controllers/productscontroller');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', ProductsController.getAddProduct);

// /admin/add-product => POST
router.post('/add-product', ProductsController.postAddProduct);

module.exports = router;
