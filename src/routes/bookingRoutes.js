const express = require('express');
const router = express.Router();
const {
	getUserBookings,
	createBooking,
	deleteBooking,
	updateBooking,
} = require('../controllers/bookingController');
const { authenticate } = require('../middlewares/auth');

// Todas las rutas de bookings son protegidas
router.get('/', authenticate, getUserBookings);
router.post('/', authenticate, createBooking);
router.delete('/:id', authenticate, deleteBooking);
router.put('/:id', authenticate, updateBooking);

module.exports = router;
