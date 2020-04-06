const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);

const MONGODB_URI = `mongodb+srv://leela:narasimha24@cluster0-i01az.mongodb.net/shop?retryWrites=true&w=majority`;

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

var store = new MongoDBStore({
	uri: MONGODB_URI,
	collection: `sessions`
});

app.use(
	session({
		secret: 'Leelas secret',
		saveUninitialized: false,
		resave: false,
		store
	})
);

app.use((req, res, next) => {
	if (!req.session.user) {
		return next();
	}

	User.findById(req.session.user._id)
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
app.use(authRoutes);

app.use(errorController.get404);

mongoose.connect(MONGODB_URI).then((result) => {
	User.findOne().then((user) => {
		if (!user) {
			const user = new User({ name: 'Leela', email: 'leela@leela.com', items: [] });
			user.save();
		}
	});
	app.listen(4500);
});
