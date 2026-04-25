const express = require('express');
const router = express.Router();
const Evento = require('../models/eventos.model');

// Listado general de eventos
router.get('/', async (req, res) => {
    try {
        const eventos = await Evento.find().populate('categoria');

        res.json({
            message: 'Eventos listados correctamente',
            estado: 'ok',
            eventos: eventos
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al listar los eventos',
            estado: 'error',
            error: error.message
        });
    }
});

// Filtro de eventos por categoría
router.get('/filtro/categoria', async (req, res) => {
    try {
        const { categoria } = req.query;

        if (!categoria) {
            return res.status(400).json({
                message: 'Debe indicar una categoría para filtrar',
                estado: 'error'
            });
        }

        const eventos = await Evento.find({ categoria: categoria }).populate('categoria');

        res.json({
            message: 'Eventos filtrados por categoría correctamente',
            estado: 'ok',
            eventos: eventos
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al filtrar eventos por categoría',
            estado: 'error',
            error: error.message
        });
    }
});

// Filtro de eventos por fecha
router.get('/filtro/fecha', async (req, res) => {
    try {
        const { fecha } = req.query;

        if (!fecha) {
            return res.status(400).json({
                message: 'Debe indicar una fecha para filtrar',
                estado: 'error'
            });
        }

        const eventos = await Evento.find({ fecha: fecha }).populate('categoria');

        res.json({
            message: 'Eventos filtrados por fecha correctamente',
            estado: 'ok',
            eventos: eventos
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al filtrar eventos por fecha',
            estado: 'error',
            error: error.message
        });
    }
});

// Consulta de eventos por estado
router.get('/filtro/estado', async (req, res) => {
    try {
        const { estado } = req.query;

        if (!estado) {
            return res.status(400).json({
                message: 'Debe indicar un estado para filtrar',
                estado: 'error'
            });
        }

        const eventos = await Evento.find({ estado: estado }).populate('categoria');

        res.json({
            message: 'Eventos filtrados por estado correctamente',
            estado: 'ok',
            eventos: eventos
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al filtrar eventos por estado',
            estado: 'error',
            error: error.message
        });
    }
});

// Detalle de evento por id
router.get('/:id', async (req, res) => {
    try {
        const evento = await Evento.findById(req.params.id).populate('categoria');

        if (!evento) {
            return res.status(404).json({
                message: 'Evento no encontrado',
                estado: 'error'
            });
        }

        res.json({
            message: 'Detalle del evento obtenido correctamente',
            estado: 'ok',
            evento: evento
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener el detalle del evento',
            estado: 'error',
            error: error.message
        });
    }
});

// Registro de evento
router.post('/', async (req, res) => {
    try {
        console.log("Datos recibidos para registrar evento:", req.body);
        const { nombre, descripcion, fecha, hora, lugar, categoria, estado } = req.body;

        if (!nombre || !descripcion || !fecha || !hora || !lugar  || !categoria || !estado) {
            return res.status(400).json({
                message: 'Faltan datos requeridos. Todos los campos son obligatorios.',
                estado: 'error'
            });
        }

        const eventoNuevo = new Evento({
            nombre,
            descripcion,
            fecha,
            hora,
            lugar,
            categoria,
            estado
        });

        try{
            await eventoNuevo.save();
        }catch(saveError) {
            console.error("Error al guardar el evento:", saveError);
            return res.status(500).json({
                message: 'Error al guardar el evento en la base de datos',
                estado: 'error',
                error: saveError.message
            });
        }

        

        res.status(201).json({
            message: 'Evento registrado correctamente',
            estado: 'ok',
            evento: eventoNuevo
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error al registrar el evento',
            estado: 'error',
            error: error.message
        });
    }
});

// Actualizar evento por id
router.put('/:id', async (req, res) => {
    try {
        const { nombre, descripcion, fecha, hora, lugar, categoria, estado } = req.body;

        if (!nombre || !descripcion || !fecha || !hora || !lugar || !categoria || !estado) {
            return res.status(400).json({
                message: 'Faltan datos requeridos para actualizar el evento',
                estado: 'error'
            });
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(
            req.params.id,
            { nombre, descripcion, fecha, hora, lugar, categoria, estado },
            { new: true }
        );

        if (!eventoActualizado) {
            return res.status(404).json({
                message: 'Evento no encontrado',
                estado: 'error'
            });
        }

        res.json({
            message: 'Evento actualizado correctamente',
            estado: 'ok',
            evento: eventoActualizado
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error al actualizar el evento',
            estado: 'error',
            error: error.message
        });
    }
});

// Eliminar evento por id
router.delete('/:id', async (req, res) => {
    try {
        const eventoEliminado = await Evento.findByIdAndDelete(req.params.id);

        if (!eventoEliminado) {
            return res.status(404).json({
                message: 'Evento no encontrado',
                estado: 'error'
            });
        }

        res.json({
            message: 'Evento eliminado correctamente',
            estado: 'ok',
            evento: eventoEliminado
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error al eliminar el evento',
            estado: 'error',
            error: error.message
        });
    }
});

module.exports = router;