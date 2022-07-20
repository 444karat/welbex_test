const Sequelize = require('sequelize');
const db = require('../index');
const Blog = require('./blog_model');

const User = db.define(
	'User',
	{
		id: {type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		login: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	},
);

User.sync();
console.log('the table user was created');
module.exports = User;
