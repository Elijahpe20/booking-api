# 🏨 Booking API

API REST para sistema de reservas de hoteles con autenticación JWT, construida con Node.js, Express, Sequelize y PostgreSQL.

## 🚀 Tecnologías

- **Backend:** Node.js + Express
- **Base de datos:** PostgreSQL
- **ORM:** Sequelize
- **Autenticación:** JWT (jsonwebtoken)
- **Seguridad:** bcrypt
- **Herramientas:** nodemon, dotenv, cors

## 📋 Características

✅ Autenticación con JWT  
✅ CRUD completo para 6 modelos  
✅ Relaciones entre modelos  
✅ Validaciones de datos  
✅ Protección de rutas privadas  
✅ Filtros y búsquedas  
✅ Paginación en reviews  
✅ 25 endpoints funcionales  

## 🗄️ Modelos

- **User** - Usuarios del sistema
- **City** - Ciudades disponibles
- **Hotel** - Hoteles en diferentes ciudades
- **Image** - Imágenes de los hoteles
- **Booking** - Reservas de usuarios
- **Review** - Reseñas y ratings de hoteles

## 📦 Instalación Local

### Prerrequisitos
- Node.js v16+
- PostgreSQL 12+
- npm

### Pasos

1. **Clonar repositorio**
```bash
git clone https://github.com/TU_USUARIO/booking-api.git
cd booking-api
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Crear archivo `.env` en la raíz:
```env
DB_USER=postgres
DB_PASSWORD=2605
DB_HOST=localhost
DB_PORT=5432
DB_NAME=booking_db
PORT=3000
JWT_SECRET=tu_secreto_super_seguro
NODE_ENV=development
```

4. **Crear base de datos**
```bash
psql -U postgres
CREATE DATABASE booking_db;
\q
```

5. **Sincronizar tablas**
```bash
node src/sync.js
```

6. **Iniciar servidor**
```bash
npm run dev
```

Servidor corriendo en: `http://localhost:3000`

## 🛣️ Endpoints (25 total)

### 🔓 Públicos (sin autenticación)

#### Users
- `POST /users` - Registrar nuevo usuario
- `POST /users/login` - Iniciar sesión y obtener token

#### Cities
- `GET /cities` - Listar todas las ciudades

#### Hotels
- `GET /hotels` - Listar hoteles (filtros: `?name=texto&cityId=1`)
- `GET /hotels/:id` - Obtener detalles de un hotel específico

#### Reviews
- `GET /reviews` - Listar reviews (filtros: `?hotelId=1&offset=0&perPage=10`)

---

### 🔒 Privados (requieren token JWT)

#### Users
- `GET /users` - Listar todos los usuarios
- `PUT /users/:id` - Actualizar datos de usuario
- `DELETE /users/:id` - Eliminar usuario

#### Cities
- `POST /cities` - Crear nueva ciudad
- `PUT /cities/:id` - Actualizar ciudad
- `DELETE /cities/:id` - Eliminar ciudad

#### Hotels
- `POST /hotels` - Crear nuevo hotel
- `PUT /hotels/:id` - Actualizar hotel
- `DELETE /hotels/:id` - Eliminar hotel

#### Images
- `GET /images` - Listar todas las imágenes
- `POST /images` - Agregar imagen a hotel
- `DELETE /images/:id` - Eliminar imagen

#### Bookings
- `GET /bookings` - Ver mis reservas
- `POST /bookings` - Crear nueva reserva
- `PUT /bookings/:id` - Actualizar fechas de reserva
- `DELETE /bookings/:id` - Cancelar reserva

#### Reviews
- `POST /reviews` - Crear review de hotel
- `PUT /reviews/:id` - Actualizar mi review
- `DELETE /reviews/:id` - Eliminar mi review

## 🔐 Autenticación

Para acceder a endpoints privados, incluir en los headers:
```
Authorization: Bearer <tu_token_jwt>
```

### Ejemplo de flujo de autenticación

1. **Registrarse:**
```json
POST /users
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "gender": "male"
}
```

2. **Login:**
```json
POST /users/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Respuesta:**
```json
{
  "user": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

3. **Usar token en peticiones:**
```
GET /bookings
Headers:
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 📁 Estructura del Proyecto
```
booking-app/
├── src/
│   ├── config/
│   │   └── database.js           # Configuración Sequelize
│   ├── controllers/              # Lógica de negocio
│   │   ├── userController.js
│   │   ├── cityController.js
│   │   ├── hotelController.js
│   │   ├── imageController.js
│   │   ├── bookingController.js
│   │   └── reviewController.js
│   ├── middlewares/
│   │   └── auth.js               # Autenticación JWT
│   ├── models/                   # Modelos Sequelize
│   │   ├── User.js
│   │   ├── City.js
│   │   ├── Hotel.js
│   │   ├── Image.js
│   │   ├── Booking.js
│   │   ├── Review.js
│   │   └── index.js              # Relaciones
│   ├── routes/                   # Definición de rutas
│   │   ├── userRoutes.js
│   │   ├── cityRoutes.js
│   │   ├── hotelRoutes.js
│   │   ├── imageRoutes.js
│   │   ├── bookingRoutes.js
│   │   └── reviewRoutes.js
│   ├── index.js                  # Servidor Express
│   └── sync.js                   # Sincronización DB
├── .env                          # Variables de entorno
├── .gitignore
├── package.json
├── Booking_API.postman_collection.json
└── README.md
```

## 🧪 Testing

✅ 25 endpoints probados con Postman  
✅ Autenticación JWT verificada  
✅ Relaciones entre modelos funcionando  
✅ Filtros y búsquedas operativas  
✅ Validaciones de datos implementadas  

## 📚 Documentación Adicional

La colección completa de Postman está incluida en el archivo `Booking_API.postman_collection.json`.

Para importarla:
1. Abrir Postman
2. Import → Upload Files
3. Seleccionar `Booking_API.postman_collection.json`

## 🌐 Deploy

**URL de producción:** [https://tu-proyecto.onrender.com](https://tu-proyecto.onrender.com)

## 👤 Autor

**Elias Vilcachagua**  
<<<<<<< HEAD
GitHub: [@TU_USUARIO](https://github.com/Elijahpe20/booking-api.git)

## 📄 Licencia

MIT License
=======
GitHub: (https://github.com/Elijahpe20/booking-api.git)

## 📄 Licencia

MIT License
>>>>>>> d03a4ff03e4f044a67a272f10ff442618572332f
