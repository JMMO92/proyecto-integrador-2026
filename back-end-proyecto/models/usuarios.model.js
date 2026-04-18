const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    cedula: {
        type: String,
        required: true,
        unique: true
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    tipoUsuario: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Usuario', usuarioSchema);