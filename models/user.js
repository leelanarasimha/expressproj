const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('Users', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	}
});

module.exports = User;
