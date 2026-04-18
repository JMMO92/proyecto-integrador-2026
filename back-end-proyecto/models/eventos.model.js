const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    fecha: {
        type: String,
        required: true
    },
    hora: {
        type: String,
        required: true
    },
    lugar: {
        type: String,
        required: true
    },
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    estado: {
        type: String,
        required: true,
        enum: ['Activo', 'Cancelado', 'Finalizado'],
        default: 'Activo'
    }
});

module.exports = mongoose.model('Evento', eventoSchema);