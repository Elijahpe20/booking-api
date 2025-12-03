const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define(
	'User',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'first_name',
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'last_name',
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
		},
		gender: {
			type: DataTypes.ENUM('male', 'female', 'other'),
			allowNull: true,
		},
	},
	{
		tableName: 'users',
		timestamps: true,
	},
);

module.exports = User;
