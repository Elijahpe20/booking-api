const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const City = sequelize.define(
	'City',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		country: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		countryId: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'country_id',
		},
	},
	{
		tableName: 'cities',
		timestamps: true,
	},
);

module.exports = City;
