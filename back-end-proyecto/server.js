require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Rutas
const usuariosRoute = require('./routes/usuarios.route');
const categoriasRoute = require('./routes/categorias.route');
const eventosRoute = require('./routes/eventos.route');

const app = express();

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('La base de datos se ha conectado exitosamente');
})
.catch((error) => {
    console.error('Error al conectar a MongoDB:', error);
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas API
app.use('/api/usuarios', usuariosRoute);
app.use('/api/categorias', categoriasRoute);
app.use('/api/eventos', eventosRoute);

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({
        message: 'Servidor funcionando correctamente',
        estado: 'ok'
    });
});

// Ruta no encontrada
app.use((req, res) => {
    res.status(404).json({
        message: 'Ruta no encontrada',
        estado: 'error'
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('El servidor esta corriendo en http://localhost:' + PORT);
});