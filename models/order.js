const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Orders = sequelize.define('Orders', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false
	}
});

module.exports = Orders;
