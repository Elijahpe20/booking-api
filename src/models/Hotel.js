const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Hotel = sequelize.define(
	'Hotel',
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
		description: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		price: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		},
		address: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lat: {
			type: DataTypes.DECIMAL(10, 8),
			allowNull: true,
		},
		lon: {
			type: DataTypes.DECIMAL(11, 8),
			allowNull: true,
		},
		cityId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'city_id',
			references: {
				model: 'cities',
				key: 'id',
			},
		},
	},
	{
		tableName: 'hotels',
		timestamps: true,
	},
);

module.exports = Hotel;
