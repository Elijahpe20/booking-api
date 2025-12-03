const { Booking, Hotel, User } = require('../models');

const getUserBookings = async (req, res) => {
	try {
		const userId = req.user.id;
		const bookings = await Booking.findAll({
			where: { userId },
			include: [
				{ model: Hotel },
				{ model: User, attributes: { exclude: ['password'] } },
			],
		});
		res.json(bookings);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const createBooking = async (req, res) => {
	try {
		const { checkIn, checkOut, hotelId } = req.body;
		const userId = req.user.id;

		const booking = await Booking.create({
			checkIn,
			checkOut,
			userId,
			hotelId,
		});

		res.status(201).json(booking);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const deleteBooking = async (req, res) => {
	try {
		const { id } = req.params;
		const booking = await Booking.findByPk(id);

		if (!booking) {
			return res.status(404).json({ error: 'Reserva no encontrada' });
		}

		// Verificar que el usuario sea el dueño de la reserva
		if (booking.userId !== req.user.id) {
			return res.status(403).json({ error: 'No autorizado' });
		}

		await booking.destroy();
		res.status(204).send();
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const updateBooking = async (req, res) => {
	try {
		const { id } = req.params;
		const { checkIn, checkOut } = req.body;

		const booking = await Booking.findByPk(id);
		if (!booking) {
			return res.status(404).json({ error: 'Reserva no encontrada' });
		}

		// Verificar que el usuario sea el dueño de la reserva
		if (booking.userId !== req.user.id) {
			return res.status(403).json({ error: 'No autorizado' });
		}

		await booking.update({ checkIn, checkOut });
		res.json(booking);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	getUserBookings,
	createBooking,
	deleteBooking,
	updateBooking,
};
