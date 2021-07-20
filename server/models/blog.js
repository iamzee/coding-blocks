const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/index');
const User = require('./user');

class Blog extends Model {}

Blog.init(
	{
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
		},
	},
	{
		sequelize,
		modelName: 'blog',
	}
);

User.hasMany(Blog, {
	foreignKey: {
		allowNull: false,
	},
	onDelete: 'CASCADE',
});
Blog.belongsTo(User);

// Blog.sync();

module.exports = Blog;
