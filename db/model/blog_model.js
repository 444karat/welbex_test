const Sequelize = require('sequelize');
const db = require('../index');

const Blog = db.define(
	'Blog',
	{
		id: {type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		text: {type: Sequelize.TEXT, allowNull: true, unique: false},
		userId: {
			allowNull: false,
			type: Sequelize.INTEGER,
			references: { // Explicitly tells Sequelize to create a foreign key relation with `Users`.`id`
				model: 'Users',
				key: 'id',
			},
		},
	},
);

Blog.sync();
console.log('the table blog was created');

module.exports = Blog;
