const getDb = require('../util/database').getDb;

class Product {
	constructor(title, description, imageUrl, price) {
		this.title = title;
		this.description = description;
		this, (imageUrl = imageUrl);
		this.price = price;
	}

	save() {
		const db = getDb();
		db.collection('products').insertOne(this);
	}
}
