const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Product = sequelize.define('Products', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	title: Sequelize.STRING,
	description: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	price: {
		type: Sequelize.DOUBLE,
		allowNull: false
	},
	imageUrl: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

module.exports = Product;
