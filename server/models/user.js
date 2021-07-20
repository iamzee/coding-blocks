const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/index');
const bcrypt = require('bcryptjs');
// const Blog = require('./blog');

class User extends Model {}

User.init(
	{
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			set(value) {
				const password = bcrypt.hashSync(value, 8);
				this.setDataValue('password', password);
			},
		},
		age: {
			type: DataTypes.INTEGER,
			validate: {
				min: 18,
				max: 100,
			},
			allowNull: false,
		},
		gender: {
			type: DataTypes.STRING,
			validate: {
				isIn: {
					args: [['M', 'F', 'O']],
					msg: 'Must be "M", "F", or "O"',
				},
			},
			allowNull: false,
		},
		status: {
			type: DataTypes.STRING,
			validate: {
				isIn: {
					args: [['Active', 'Inactive']],
					msg: 'Must be "Active" or "Inactive"',
				},
			},
			allowNull: false,
		},
		portfolio: {
			type: DataTypes.STRING,
		},
		avatar: {
			type: DataTypes.STRING,
		},
	},
	{
		sequelize,
		modelName: 'user',
	}
);

// User.hasMany(Blog);
// Blog.belongsTo(User);

User.sync();

module.exports = User;
