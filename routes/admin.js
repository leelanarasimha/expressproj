const path = require('path');

const express = require('express');

const AdminController = require('../controllers/AdminController');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', AdminController.getAddProduct);

// /admin/add-product => POST
router.post('/add-product', AdminController.postAddProduct);

// /admin/products => get
router.get('/products', AdminController.getProducts);

module.exports = router;
