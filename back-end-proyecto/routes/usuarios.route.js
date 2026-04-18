const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuarios.model');

// Listado de usuarios
router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario.find();

        res.json({
            message: 'Usuarios listados correctamente',
            estado: 'ok',
            usuarios: usuarios
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al listar los usuarios',
            estado: 'error',
            error: error.message
        });
    }
});

// Registro de usuario
router.post('/', async (req, res) => {
    try {
        const { nombre, cedula, correo, tipoUsuario } = req.body;

        if (!nombre || !cedula || !correo || !tipoUsuario) {
            return res.status(400).json({
                message: 'Faltan datos requeridos. Todos los campos son obligatorios.',
                estado: 'error'
            });
        }

        const usuarioNuevo = new Usuario({
            nombre,
            cedula,
            correo,
            tipoUsuario
        });

        await usuarioNuevo.save();

        res.status(201).json({
            message: 'Usuario registrado correctamente',
            estado: 'ok',
            usuario: usuarioNuevo
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error al registrar el usuario',
            estado: 'error',
            error: error.message
        });
    }
});

// Eliminar usuario por cédula
router.delete('/cedula/:cedula', async (req, res) => {
    try {
        const cedula = req.params.cedula;

        const usuarioEliminado = await Usuario.findOneAndDelete({ cedula: cedula });

        if (!usuarioEliminado) {
            return res.status(404).json({
                message: 'Usuario no encontrado',
                estado: 'error'
            });
        }

        res.json({
            message: 'Usuario eliminado correctamente',
            estado: 'ok',
            usuario: usuarioEliminado
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error al eliminar el usuario',
            estado: 'error',
            error: error.message
        });
    }
});

// Actualizar usuario por cédula
router.put('/cedula/:cedula', async (req, res) => {
    try {
        const cedula = req.params.cedula;
        const { nombre, correo, tipoUsuario } = req.body;

        if (!nombre || !correo || !tipoUsuario) {
            return res.status(400).json({
                message: 'Faltan datos requeridos para actualizar el usuario',
                estado: 'error'
            });
        }

        const usuarioActualizado = await Usuario.findOneAndUpdate(
            { cedula: cedula },
            { nombre, correo, tipoUsuario },
            { new: true }
        );

        if (!usuarioActualizado) {
            return res.status(404).json({
                message: 'Usuario no encontrado',
                estado: 'error'
            });
        }

        res.json({
            message: 'Usuario actualizado correctamente',
            estado: 'ok',
            usuario: usuarioActualizado
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error al actualizar el usuario',
            estado: 'error',
            error: error.message
        });
    }
});

module.exports = router;