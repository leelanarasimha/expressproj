const getDb = require('../util/database').getDb;
const mongo = require('mongodb');
const Product = require('./Product');
class User {
	constructor(username, email, cart, id) {
		this.name = username;
		this.email = email;
		this.cart = cart;
		this._id = id;
	}

	save() {
		const db = getDb();
		return db
			.collection(`users`)
			.insertOne(this)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	addToCart(product) {
		const db = getDb();
		let newQuantity = 1;

		if (!this.cart.items) {
			this.cart.items = [];
		}
		const cartProductIndex = this.cart.items.findIndex((cp) => {
			return cp.productId.toString() === product._id.toString();
		});

		let updatedCartItems = [ ...this.cart.items ];

		if (cartProductIndex >= 0) {
			newQuantity = this.cart.items[cartProductIndex].quantity + 1;

			updatedCartItems[cartProductIndex].quantity = newQuantity;
		} else {
			updatedCartItems.push({ productId: product._id, quantity: 1 });
		}

		const updatedCart = { items: updatedCartItems };

		return db
			.collection(`users`)
			.updateOne({ _id: new mongo.ObjectId(this._id) }, { $set: { cart: updatedCart } });
	}

	getCart() {
		const db = getDb();
		console.log('leela sdsd');
		console.log(this.cart.items);
		const productIds = this.cart.items.map((p) => {
			return p.productId;
		});

		console.log(productIds);
		console.log('leela');

		return db
			.collection(`products`)
			.find({ _id: { $in: productIds } })
			.toArray()
			.then((products) => {
				return products.map((p) => {
					return {
						...p,
						quantity: this.cart.items.find((i) => {
							return i.productId.toString() === p._id.toString();
						}).quantity
					};
				});
			});
	}

	deleteItemFromCart(productId) {
		const updatedCartItems = this.cart.items.filter((item) => {
			return productId.toString() !== item.productId.toString();
		});

		const db = getDb();
		return db
			.collection(`users`)
			.updateOne(
				{ _id: new mongo.ObjectId(this._id) },
				{ $set: { cart: { items: updatedCartItems } } }
			);
	}

	static findById(id) {
		console.log(id);
		const db = getDb();
		return db.collection(`users`).findOne({ _id: new mongo.ObjectId(id) });
	}
}

module.exports = User;
