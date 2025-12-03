const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Review = sequelize.define(
	'Review',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		rating: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				min: 1,
				max: 5,
			},
		},
		comment: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'user_id',
			references: {
				model: 'users',
				key: 'id',
			},
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
		tableName: 'reviews',
		timestamps: true,
	},
);

module.exports = Review;
