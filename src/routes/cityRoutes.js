const express = require('express');
const router = express.Router();
const {
	getAllCities,
	createCity,
	deleteCity,
	updateCity,
} = require('../controllers/cityController');
const { authenticate } = require('../middlewares/auth');

// Ruta pública
router.get('/', getAllCities);

// Rutas protegidas
router.post('/', authenticate, createCity);
router.delete('/:id', authenticate, deleteCity);
router.put('/:id', authenticate, updateCity);

module.exports = router;
