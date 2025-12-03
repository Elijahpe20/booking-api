const express = require('express');
const router = express.Router();
const {
	register,
	login,
	getAllUsers,
	deleteUser,
	updateUser,
} = require('../controllers/userController');
const { authenticate } = require('../middlewares/auth');

// Rutas públicas
router.post('/', register);
router.post('/login', login);

// Rutas protegidas
router.get('/', authenticate, getAllUsers);
router.delete('/:id', authenticate, deleteUser);
router.put('/:id', authenticate, updateUser);

module.exports = router;
