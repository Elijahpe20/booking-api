const express = require('express');
const router = express.Router();
const {
	getAllReviews,
	createReview,
	deleteReview,
	updateReview,
} = require('../controllers/reviewController');
const { authenticate } = require('../middlewares/auth');

// Ruta pública
router.get('/', getAllReviews);

// Rutas protegidas
router.post('/', authenticate, createReview);
router.delete('/:id', authenticate, deleteReview);
router.put('/:id', authenticate, updateReview);

module.exports = router;
