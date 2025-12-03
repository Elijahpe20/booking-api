const { Review, Hotel, User } = require('../models');

const getAllReviews = async (req, res) => {
	try {
		const { hotelId, offset = 0, perPage = 10 } = req.query;

		const where = {};
		if (hotelId) {
			where.hotelId = hotelId;
		}

		const reviews = await Review.findAll({
			where,
			include: [
				{ model: Hotel },
				{ model: User, attributes: { exclude: ['password'] } },
			],
			offset: parseInt(offset),
			limit: parseInt(perPage),
		});

		res.json(reviews);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const createReview = async (req, res) => {
	try {
		const { rating, comment, hotelId } = req.body;
		const userId = req.user.id;

		const review = await Review.create({
			rating,
			comment,
			userId,
			hotelId,
		});

		res.status(201).json(review);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const deleteReview = async (req, res) => {
	try {
		const { id } = req.params;
		const review = await Review.findByPk(id);

		if (!review) {
			return res.status(404).json({ error: 'Reseña no encontrada' });
		}

		// Verificar que el usuario sea el dueño de la reseña
		if (review.userId !== req.user.id) {
			return res.status(403).json({ error: 'No autorizado' });
		}

		await review.destroy();
		res.status(204).send();
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const updateReview = async (req, res) => {
	try {
		const { id } = req.params;
		const { rating, comment } = req.body;

		const review = await Review.findByPk(id);
		if (!review) {
			return res.status(404).json({ error: 'Reseña no encontrada' });
		}

		// Verificar que el usuario sea el dueño de la reseña
		if (review.userId !== req.user.id) {
			return res.status(403).json({ error: 'No autorizado' });
		}

		await review.update({ rating, comment });
		res.json(review);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	getAllReviews,
	createReview,
	deleteReview,
	updateReview,
};
