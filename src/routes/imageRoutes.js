const express = require('express');
const router = express.Router();
const {
	getAllImages,
	createImage,
	deleteImage,
} = require('../controllers/imageController');
const { authenticate } = require('../middlewares/auth');

// Ruta protegida (para ver imágenes)
router.get('/', authenticate, getAllImages);

// Rutas protegidas
router.post('/', authenticate, createImage);
router.delete('/:id', authenticate, deleteImage);

module.exports = router;
