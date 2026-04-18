const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    descripcion: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true,
        enum: ['Activa', 'Inactiva'],
        default: 'Activa'
    }
});

module.exports = mongoose.model('Categoria', categoriaSchema);