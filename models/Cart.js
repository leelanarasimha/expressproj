const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json');

module.exports = class Cart {
	static addProduct(id) {
		fs.readFile(
			p,
			(err,
			(fileContent) => {
				let cart = { products: [], totalPrice: 0 };
				const products = JSON.parse(fileContent);

				const productIndex = products.findIndex((p) => p.id == id);
			})
		);
	}
};
