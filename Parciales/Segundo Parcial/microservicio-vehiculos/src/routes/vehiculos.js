const express = require('express');
const router = express.Router();
const Vehiculo = require('../models/vehiculo');
const verificarToken = require('../middlewares/auth');

// Todas las rutas están protegidas con JWT
router.use(verificarToken);

/**
 * @swagger
 * /api/vehiculos:
 *   post:
 *     summary: Crear un vehículo
 *     tags: [Vehiculos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               placa:
 *                 type: string
 *               tipo:
 *                 type: string
 *               capacidad:
 *                 type: number
 *               estado:
 *                 type: string
 *     responses:
 *       201:
 *         description: Vehículo creado
 *       400:
 *         description: Error en los datos
 */
router.post('/', async (req, res) => {
  try {
    const { placa, tipo, capacidad, estado } = req.body;

    const nuevoVehiculo = new Vehiculo({
      placa,
      tipo,
      capacidad,
      estado
    });

    await nuevoVehiculo.save();

    res.status(201).json({
      mensaje: 'Vehículo creado exitosamente',
      vehiculo: nuevoVehiculo
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ 
        mensaje: 'La placa ya está registrada' 
      });
    }
    
    res.status(500).json({ 
      mensaje: 'Error al crear el vehículo', 
      error: error.message 
    });
  }
});

/**
 * @swagger
 * /api/vehiculos:
 *   get:
 *     summary: Listar todos los vehículos
 *     tags: [Vehiculos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de vehículos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: number
 *                 vehiculos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       placa:
 *                         type: string
 *                       tipo:
 *                         type: string
 *                       capacidad:
 *                         type: number
 *                       estado:
 *                         type: string
 */
router.get('/', async (req, res) => {
  try {
    const vehiculos = await Vehiculo.find();

    res.json({
      total: vehiculos.length,
      vehiculos
    });
  } catch (error) {
    res.status(500).json({ 
      mensaje: 'Error al obtener los vehículos', 
      error: error.message 
    });
  }
});

/**
 * @swagger
 * /api/vehiculos/{id}:
 *   get:
 *     summary: Obtener un vehículo por ID
 *     tags: [Vehiculos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del vehículo
 *     responses:
 *       200:
 *         description: Vehículo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 placa:
 *                   type: string
 *                 tipo:
 *                   type: string
 *                 capacidad:
 *                   type: number
 *                 estado:
 *                   type: string
 *       404:
 *         description: Vehículo no encontrado
 */
router.get('/:id', async (req, res) => {
  try {
    const vehiculo = await Vehiculo.findById(req.params.id);

    if (!vehiculo) {
      return res.status(404).json({ 
        mensaje: 'Vehículo no encontrado' 
      });
    }

    res.json(vehiculo);
  } catch (error) {
    res.status(500).json({ 
      mensaje: 'Error al obtener el vehículo', 
      error: error.message 
    });
  }
});

/**
 * @swagger
 * /api/vehiculos/{id}:
 *   put:
 *     summary: Actualizar un vehículo
 *     tags: [Vehiculos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del vehículo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               placa:
 *                 type: string
 *               tipo:
 *                 type: string
 *               capacidad:
 *                 type: number
 *               estado:
 *                 type: string
 *     responses:
 *       200:
 *         description: Vehículo actualizado
 *       404:
 *         description: Vehículo no encontrado
 */
router.put('/:id', async (req, res) => {
  try {
    const { placa, tipo, capacidad, estado } = req.body;

    const vehiculoActualizado = await Vehiculo.findByIdAndUpdate(
      req.params.id,
      { placa, tipo, capacidad, estado },
      { new: true }
    );

    if (!vehiculoActualizado) {
      return res.status(404).json({ 
        mensaje: 'Vehículo no encontrado' 
      });
    }

    res.json({
      mensaje: 'Vehículo actualizado exitosamente',
      vehiculo: vehiculoActualizado
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ 
        mensaje: 'La placa ya está registrada' 
      });
    }

    res.status(500).json({ 
      mensaje: 'Error al actualizar el vehículo', 
      error: error.message 
    });
  }
});

/**
 * @swagger
 * /api/vehiculos/{id}:
 *   delete:
 *     summary: Eliminar un vehículo
 *     tags: [Vehiculos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del vehículo
 *     responses:
 *       200:
 *         description: Vehículo eliminado
 *       404:
 *         description: Vehículo no encontrado
 */
router.delete('/:id', async (req, res) => {
  try {
    const vehiculoEliminado = await Vehiculo.findByIdAndDelete(req.params.id);

    if (!vehiculoEliminado) {
      return res.status(404).json({ 
        mensaje: 'Vehículo no encontrado' 
      });
    }

    res.json({
      mensaje: 'Vehículo eliminado exitosamente',
      vehiculo: vehiculoEliminado
    });
  } catch (error) {
    res.status(500).json({ 
      mensaje: 'Error al eliminar el vehículo', 
      error: error.message 
    });
  }
});

module.exports = router;