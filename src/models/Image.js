const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Image = sequelize.define(
	'Image',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		url: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		hotelId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'hotel_id',
			references: {
				model: 'hotels',
				key: 'id',
			},
		},
	},
	{
		tableName: 'images',
		timestamps: true,
	},
);

module.exports = Image;
