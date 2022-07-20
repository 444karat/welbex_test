const Sequelize = require('sequelize');
const db = require('../index');

const File = db.define(
	'File',
	{
		id: {type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		link: {type: Sequelize.STRING,
			allowNull: true,
		},
		blogId: {
			allowNull: false,
			type: Sequelize.INTEGER,
			references: {
				model: 'Blogs',
				key: 'id',
			},
		},
	},
);

File.sync();
console.log('the table File was created');

module.exports = File;
