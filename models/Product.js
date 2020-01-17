const products = [];

module.exports = class Product {
	constructor(title) {
		this.title = title;
	}

	save() {
		products.push({ title: this.title });
	}

	static fetchAll() {
		return products;
	}
};
