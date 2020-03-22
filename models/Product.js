const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Product {
	constructor(title, description, imageUrl, price, id, userId) {
		this.title = title;
		this.description = description;
		this.imageUrl = imageUrl;
		this.price = price;
		this.id = id ? new mongodb.ObjectId(id) : null;
		this.userId = userId;
	}

	save() {
		const db = getDb();
		let dbObj;
		if (this.id) {
			console.log(this);
			dbObj = db.collection('products').updateOne({ _id: this.id }, { $set: this });
		} else {
			dbObj = db.collection('products').insertOne(this);
		}

		return dbObj.then((result) => {}).catch((err) => {
			console.log(err);
		});
	}

	static fetchAll() {
		const db = getDb();
		return db
			.collection('products')
			.find()
			.toArray()
			.then((products) => {
				return products;
			})
			.catch((err) => {
				console.log(err);
			});
	}

	static findById(prodId) {
		const db = getDb();

		return db
			.collection('products')
			.find({ _id: new mongodb.ObjectId(prodId) })
			.next()
			.then((product) => {
				return product;
			})
			.catch((err) => {
				console.log(err);
			});
	}

	static delete(id) {
		const db = getDb();

		return db
			.collection(`products`)
			.deleteOne({ _id: new mongodb.ObjectId(id) })
			.then((result) => {})
			.catch((err) => {
				console.log('dsdsd');
			});
	}
}

module.exports = Product;
