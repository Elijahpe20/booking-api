const sequelize = require('../config/database');
const User = require('./User');
const City = require('./City');
const Hotel = require('./Hotel');
const Image = require('./Image');
const Booking = require('./Booking');
const Review = require('./Review');

// Relaciones
// City -> Hotel
City.hasMany(Hotel, { foreignKey: 'cityId', onDelete: 'CASCADE' });
Hotel.belongsTo(City, { foreignKey: 'cityId' });

// Hotel -> Image
Hotel.hasMany(Image, { foreignKey: 'hotelId', onDelete: 'CASCADE' });
Image.belongsTo(Hotel, { foreignKey: 'hotelId' });

// User -> Booking
User.hasMany(Booking, { foreignKey: 'userId', onDelete: 'CASCADE' });
Booking.belongsTo(User, { foreignKey: 'userId' });

// Hotel -> Booking
Hotel.hasMany(Booking, { foreignKey: 'hotelId', onDelete: 'CASCADE' });
Booking.belongsTo(Hotel, { foreignKey: 'hotelId' });

// User -> Review
User.hasMany(Review, { foreignKey: 'userId', onDelete: 'CASCADE' });
Review.belongsTo(User, { foreignKey: 'userId' });

// Hotel -> Review
Hotel.hasMany(Review, { foreignKey: 'hotelId', onDelete: 'CASCADE' });
Review.belongsTo(Hotel, { foreignKey: 'hotelId' });

module.exports = {
	sequelize,
	User,
	City,
	Hotel,
	Image,
	Booking,
	Review,
};
