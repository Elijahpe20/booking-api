const { City } = require('../models');

const getAllCities = async (req, res) => {
	try {
		const cities = await City.findAll();
		res.json(cities);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const createCity = async (req, res) => {
	try {
		const { name, country, countryId } = req.body;
		const city = await City.create({ name, country, countryId });
		res.status(201).json(city);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const deleteCity = async (req, res) => {
	try {
		const { id } = req.params;
		const city = await City.findByPk(id);

		if (!city) {
			return res.status(404).json({ error: 'Ciudad no encontrada' });
		}

		await city.destroy();
		res.status(204).send();
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const updateCity = async (req, res) => {
	try {
		const { id } = req.params;
		const { name, country, countryId } = req.body;

		const city = await City.findByPk(id);
		if (!city) {
			return res.status(404).json({ error: 'Ciudad no encontrada' });
		}

		await city.update({ name, country, countryId });
		res.json(city);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	getAllCities,
	createCity,
	deleteCity,
	updateCity,
};
