const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Booking = sequelize.define(
	'Booking',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		checkIn: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			field: 'check_in',
		},
		checkOut: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			field: 'check_out',
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
		tableName: 'bookings',
		timestamps: true,
	},
);

module.exports = Booking;
