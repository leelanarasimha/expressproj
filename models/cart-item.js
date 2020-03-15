const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const CartItem = sequelize.define('CartItem', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false
	},
	quantity: {
		type: Sequelize.INTEGER,
		allowNull: false
	}
});

module.exports = CartItem;
