const Product = require('../models/Product');

exports.getProducts = (req, res, next) => {
	const products = Product.fetchAll((products) => {
		res.render('shop/product-list', {
			prods: products,
			pageTitle: 'All Products',
			path: '/products'
		});
	});
};

exports.getProductById = (req, res, next) => {
	const productId = req.params.productId;
	Product.getProductById(productId, (product) => {
		res.render('shop/product-detail', {
			product,
			path: '/products',
			pageTitle: product.title
		});
	});
};

exports.getIndex = (req, res, next) => {
	const products = Product.fetchAll((products) => {
		res.render('shop/index', {
			prods: products,
			pageTitle: 'Shop',
			path: '/'
		});
	});
};

exports.getCart = (req, res, next) => {
	res.render('shop/cart', {
		path: '/cart',
		pageTitle: 'My Cart'
	});
};

exports.postCart = (req, res, next) => {
	const productId = req.body.productid;
	res.redirect('/cart');
};

exports.getCheckout = (req, res, next) => {
	res.render('shop/checkout', {
		path: '/checkout',
		pageTitle: 'Checkout'
	});
};

exports.getOrders = (req, res, next) => {
	res.render('shop/orders', {
		path: '/orders',
		pageTitle: 'Orders'
	});
};
