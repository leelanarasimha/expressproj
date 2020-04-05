const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use((req, res, next) => {
	User.findById(`5e88cb15fc0e7b39a88633f8`)
		.then((user) => {
			req.user = user;
			next();
		})
		.catch((err) => {
			console.log(err);
		});
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
	.connect(
		`mongodb+srv://leela:narasimha24@cluster0-i01az.mongodb.net/shop?retryWrites=true&w=majority`
	)
	.then((result) => {
		User.findOne().then((user) => {
			if (!user) {
				const user = new User({ name: 'Leela', email: 'leela@leela.com', items: [] });
				user.save();
			}
		});
		app.listen(4500);
	});
