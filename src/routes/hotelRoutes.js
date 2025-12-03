const express = require('express');
const router = express.Router();
const {
	getAllHotels,
	getHotelById,
	createHotel,
	deleteHotel,
	updateHotel,
} = require('../controllers/hotelController');
const { authenticate } = require('../middlewares/auth');

// Rutas públicas
router.get('/', getAllHotels);
router.get('/:id', getHotelById);

// Rutas protegidas
router.post('/', authenticate, createHotel);
router.delete('/:id', authenticate, deleteHotel);
router.put('/:id', authenticate, updateHotel);

module.exports = router;
