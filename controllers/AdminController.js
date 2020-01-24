const Product = require('../models/Product');

exports.getAddProduct = (req, res, next) => {
	res.render('admin/add-product', {
		pageTitle: 'Add Product',
		path: '/admin/add-product',
		formsCSS: true,
		productCSS: true,
		activeAddProduct: true
	});
};

exports.postAddProduct = (req, res, next) => {
	const title = req.body.title;
	const imageUrl = req.body.imageUrl;
	const price = req.body.price;
	const description = req.body.description;

	new Product(title, imageUrl, description, price).save();
	res.redirect('/');
};

exports.getProducts = (req, res, next) => {
	const products = Product.fetchAll((products) => {
		res.render('admin/products', {
			prods: products,
			pageTitle: 'All Products',
			path: '/admin/products'
		});
	});
};
