const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const OrderItems = sequelize.define('OrderItems', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false
	},
	quantity: Sequelize.INTEGER
});

module.exports = OrderItems;
