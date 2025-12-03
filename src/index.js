const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { sequelize } = require('./models');

// Importar rutas
const userRoutes = require('./routes/userRoutes');
const cityRoutes = require('./routes/cityRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const imageRoutes = require('./routes/imageRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
	res.json({ message: 'Booking API funcionando!' });
});

// Rutas
app.use('/users', userRoutes);
app.use('/cities', cityRoutes);
app.use('/hotels', hotelRoutes);
app.use('/images', imageRoutes);
app.use('/bookings', bookingRoutes);
app.use('/reviews', reviewRoutes);

// Iniciar servidor
sequelize
	.authenticate()
	.then(() => {
		console.log('✅ Conexión a la base de datos exitosa');
		app.listen(PORT, () => {
			console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
		});
	})
	.catch((err) => {
		console.error('❌ Error al conectar a la base de datos:', err);
	});

module.exports = app;
