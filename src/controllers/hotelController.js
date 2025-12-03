const { Hotel, City, Image, Review } = require('../models');
const { Op } = require('sequelize');

const getAllHotels = async (req, res) => {
	try {
		const { name, cityId } = req.query;

		const where = {};
		if (name) {
			where.name = { [Op.iLike]: `%${name}%` };
		}
		if (cityId) {
			where.cityId = cityId;
		}

		const hotels = await Hotel.findAll({
			where,
			include: [{ model: City }, { model: Image }, { model: Review }],
		});

		// Calcular promedio de rating
		const hotelsWithAverage = hotels.map((hotel) => {
			const hotelData = hotel.toJSON();
			if (hotelData.Reviews && hotelData.Reviews.length > 0) {
				const sum = hotelData.Reviews.reduce(
					(acc, review) => acc + review.rating,
					0,
				);
				hotelData.average = (sum / hotelData.Reviews.length).toFixed(2);
			} else {
				hotelData.average = 0;
			}
			return hotelData;
		});

		res.json(hotelsWithAverage);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getHotelById = async (req, res) => {
	try {
		const { id } = req.params;
		const hotel = await Hotel.findByPk(id, {
			include: [{ model: City }, { model: Image }, { model: Review }],
		});

		if (!hotel) {
			return res.status(404).json({ error: 'Hotel no encontrado' });
		}

		const hotelData = hotel.toJSON();
		if (hotelData.Reviews && hotelData.Reviews.length > 0) {
			const sum = hotelData.Reviews.reduce(
				(acc, review) => acc + review.rating,
				0,
			);
			hotelData.average = (sum / hotelData.Reviews.length).toFixed(2);
		} else {
			hotelData.average = 0;
		}

		res.json(hotelData);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const createHotel = async (req, res) => {
	try {
		const { name, description, price, address, lat, lon, cityId } = req.body;
		const hotel = await Hotel.create({
			name,
			description,
			price,
			address,
			lat,
			lon,
			cityId,
		});
		res.status(201).json(hotel);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const deleteHotel = async (req, res) => {
	try {
		const { id } = req.params;
		const hotel = await Hotel.findByPk(id);

		if (!hotel) {
			return res.status(404).json({ error: 'Hotel no encontrado' });
		}

		await hotel.destroy();
		res.status(204).send();
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const updateHotel = async (req, res) => {
	try {
		const { id } = req.params;
		const { name, description, price, address, lat, lon } = req.body;

		const hotel = await Hotel.findByPk(id);
		if (!hotel) {
			return res.status(404).json({ error: 'Hotel no encontrado' });
		}

		await hotel.update({ name, description, price, address, lat, lon });
		res.json(hotel);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	getAllHotels,
	getHotelById,
	createHotel,
	deleteHotel,
	updateHotel,
};
