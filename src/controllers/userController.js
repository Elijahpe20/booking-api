const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const generateToken = (user) => {
	return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
		expiresIn: '7d',
	});
};

const register = async (req, res) => {
	try {
		const { firstName, lastName, email, password, gender } = req.body;

		const existingUser = await User.findOne({ where: { email } });
		if (existingUser) {
			return res.status(400).json({ error: 'El email ya está registrado' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await User.create({
			firstName,
			lastName,
			email,
			password: hashedPassword,
			gender,
		});

		res.status(201).json({
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			gender: user.gender,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ where: { email } });
		if (!user) {
			return res.status(401).json({ error: 'Credenciales inválidas' });
		}

		const isValidPassword = await bcrypt.compare(password, user.password);
		if (!isValidPassword) {
			return res.status(401).json({ error: 'Credenciales inválidas' });
		}

		const token = generateToken(user);

		res.json({
			user: {
				id: user.id,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				gender: user.gender,
			},
			token,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getAllUsers = async (req, res) => {
	try {
		const users = await User.findAll({
			attributes: { exclude: ['password'] },
		});
		res.json(users);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const deleteUser = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findByPk(id);

		if (!user) {
			return res.status(404).json({ error: 'Usuario no encontrado' });
		}

		await user.destroy();
		res.status(204).send();
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const updateUser = async (req, res) => {
	try {
		const { id } = req.params;
		const { firstName, lastName, gender } = req.body;

		const user = await User.findByPk(id);
		if (!user) {
			return res.status(404).json({ error: 'Usuario no encontrado' });
		}

		await user.update({ firstName, lastName, gender });

		res.json({
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			gender: user.gender,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	register,
	login,
	getAllUsers,
	deleteUser,
	updateUser,
};
