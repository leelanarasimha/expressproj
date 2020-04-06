const User = require('../models/user');

exports.getLogin = (req, res, next) => {
	res.render('auth/login', {
		path: '/login',
		pageTitle: 'Login',
		isAuthenticated: false
	});
};

exports.postLogin = (req, res, next) => {
	User.findById(`5e88cb15fc0e7b39a88633f8`)
		.then((user) => {
			req.session.user = user;
			req.session.isLoggedIn = true;
			req.session.save((err) => {
				res.redirect('/');
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getLogout = (req, res, next) => {
	req.session.destroy((err) => {
		res.redirect('/');
	});
};
