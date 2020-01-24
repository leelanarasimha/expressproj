const express = require('express');

const ShopController = require('../controllers/ShopController');

const router = express.Router();

// / => get
router.get('/', ShopController.getIndex);

// GET => /products
router.get('/products', ShopController.getProducts);

//GET => /orders
router.get('/orders', ShopController.getOrders);

//GET => /cart
router.get('/cart', ShopController.getCart);

// GET => /checkout
router.get('/checkout', ShopController.getCheckout);

module.exports = router;
