const db = require('../util/database');
module.exports = class Product {
	constructor(id, title, imageUrl, description, price) {
		this.id = id;
		this.title = title;
		this.imageUrl = imageUrl;
		this.description = description;
		this.price = price;
	}

	save() {
		return db.execute(
			`INSERT INTO products (title, description, price, imageUrl) values (?,?,?,?)`,
			[ this.title, this.description, this.price, this.imageUrl ]
		);
	}

	static deleteById(id) {}

	static fetchAll() {
		return db.execute(`SELECT * FROM products`);
	}

	static findById(id) {
		return db.execute(`SELECT * FROM products where id = ?`, id);
	}
};
