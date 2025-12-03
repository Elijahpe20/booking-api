const { Image } = require('../models');

const getAllImages = async (req, res) => {
	try {
		const images = await Image.findAll();
		res.json(images);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const createImage = async (req, res) => {
	try {
		const { url, hotelId } = req.body;
		const image = await Image.create({ url, hotelId });
		res.status(201).json(image);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const deleteImage = async (req, res) => {
	try {
		const { id } = req.params;
		const image = await Image.findByPk(id);

		if (!image) {
			return res.status(404).json({ error: 'Imagen no encontrada' });
		}

		await image.destroy();
		res.status(204).send();
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	getAllImages,
	createImage,
	deleteImage,
};
