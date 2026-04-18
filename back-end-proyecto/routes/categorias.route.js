const express = require('express');
const router = express.Router();
const Categoria = require('../models/categorias.model');

// Listado de categorías
router.get('/', async (req, res) => {
    try {
        const categorias = await Categoria.find();

        res.json({
            message: 'Categorías listadas correctamente',
            estado: 'ok',
            categorias: categorias
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al listar las categorías',
            estado: 'error',
            error: error.message
        });
    }
});

// Registro de categoría
router.post('/', async (req, res) => {
    try {
        const { nombre, descripcion, estado } = req.body;

        if (!nombre || !descripcion || !estado) {
            return res.status(400).json({
                message: 'Faltan datos requeridos. Todos los campos son obligatorios.',
                estado: 'error'
            });
        }

        const categoriaNueva = new Categoria({
            nombre,
            descripcion,
            estado
        });

        await categoriaNueva.save();

        res.status(201).json({
            message: 'Categoría registrada correctamente',
            estado: 'ok',
            categoria: categoriaNueva
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error al registrar la categoría',
            estado: 'error',
            error: error.message
        });
    }
});

// Eliminar categoría por id
router.delete('/:id', async (req, res) => {
    try {
        const categoriaEliminada = await Categoria.findByIdAndDelete(req.params.id);

        if (!categoriaEliminada) {
            return res.status(404).json({
                message: 'Categoría no encontrada',
                estado: 'error'
            });
        }

        res.json({
            message: 'Categoría eliminada correctamente',
            estado: 'ok',
            categoria: categoriaEliminada
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error al eliminar la categoría',
            estado: 'error',
            error: error.message
        });
    }
});

// Actualizar categoría por id
router.put('/:id', async (req, res) => {
    try {
        const { nombre, descripcion, estado } = req.body;

        if (!nombre || !descripcion || !estado) {
            return res.status(400).json({
                message: 'Faltan datos requeridos para actualizar la categoría',
                estado: 'error'
            });
        }

        const categoriaActualizada = await Categoria.findByIdAndUpdate(
            req.params.id,
            { nombre, descripcion, estado },
            { new: true }
        );

        if (!categoriaActualizada) {
            return res.status(404).json({
                message: 'Categoría no encontrada',
                estado: 'error'
            });
        }

        res.json({
            message: 'Categoría actualizada correctamente',
            estado: 'ok',
            categoria: categoriaActualizada
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error al actualizar la categoría',
            estado: 'error',
            error: error.message
        });
    }
});

module.exports = router;