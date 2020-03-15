const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const sequelize = require('./util/database');
const Product = require('./models/Product');
const User = require('./models/user');
const Cart = require('./models/Cart');
const CartItem = require('./models/cart-item');
const Orders = require('./models/order');
const OrderItems = require('./models/order-items');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use((req, res, next) => {
	User.findByPk(1).then((user) => {
		req.user = user;
		next();
	});
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { onDelete: 'CASCADE' });
User.hasMany(Product);

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

User.hasOne(Cart);
Cart.belongsTo(User);

Orders.belongsTo(User);
User.hasMany(Orders);
Orders.belongsToMany(Product, { through: OrderItems });

sequelize
	.sync()
	.then((result) => {
		return User.findByPk(1);
	})
	.then((user) => {
		if (!user) {
			return User.create({ name: 'Leela', email: 'test@test.com' });
		}
		return Promise.resolve(user);
	})
	.then((user) => {
		user
			.getCart()
			.then((cart) => {
				if (!cart) {
					return user.createCart();
				}
			})
			.catch((err) => {
				console.log(err);
			});
	})
	.then((user) => {
		app.listen(4500);
	})
	.catch((err) => {
		console.log(err);
	});
