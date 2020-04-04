const Product = require('../models/Product');
const user = require('../models/user');

exports.getProducts = (req, res, next) => {
	Product.fetchAll()
		.then((products) => {
			res.render('shop/product-list', {
				prods: products,
				pageTitle: 'All Products',
				path: '/products'
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getProduct = (req, res, next) => {
	const prodId = req.params.productId;
	Product.findById(prodId).then((product) => {
		res.render('shop/product-detail', {
			product: product,
			pageTitle: product.title,
			path: '/products'
		});
	});
};

exports.getIndex = (req, res, next) => {
	Product.fetchAll()
		.then((products) => {
			res.render('shop/index', {
				prods: products,
				pageTitle: 'Shop',
				path: '/'
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getCart = (req, res, next) => {
	req.user
		.getCart()
		.then((products) => {
			console.log(products);
			res.render('shop/cart', {
				path: '/cart',
				pageTitle: 'Your Cart',
				products: products
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.postCart = (req, res, next) => {
	const prodId = req.body.productId;
	let fetchedCart;
	let newQuantity = 1;

	Product.findById(prodId)
		.then((product) => {
			return req.user.addToCart(product);
		})
		.then((result) => {
			res.redirect('/cart');
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.postCartDeleteProduct = (req, res, next) => {
	const prodId = req.body.productId;

	req.user
		.deleteItemFromCart(prodId)
		.then((result) => {
			res.redirect('/cart');
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getOrders = (req, res, next) => {
	req.user
		.getOrders({ include: Product })
		.then((orders) => {
			res.render('shop/orders', {
				path: '/orders',
				pageTitle: 'Your Orders',
				orders
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.createOrder = (req, res, next) => {
	let fetchedCart;
	req.user
		.getCart()
		.then((cart) => {
			fetchedCart = cart;
			return req.user
				.createOrder()
				.then((order) => {
					return order.addProducts(
						products.map((product) => {
							product.OrderItems = { quantity: product.CartItem.quantity };
							return product;
						})
					);
				})
				.catch((err) => console.log(err));
		})
		.then((result) => {
			return fetchedCart.setProducts(null);
		})
		.then((result) => {
			res.redirect('/orders');
		})
		.catch((err) => {
			console.log(err);
		});
};
