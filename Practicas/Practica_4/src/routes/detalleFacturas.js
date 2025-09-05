const express = require("express");
const DetalleFacturasController = require("../controllers/DetalleFacturasController");
const router = express.Router();

/**
 * @swagger
 * /facturas/{facturaId}/detalles:
 *   get:
 *     tags:
 *       - DetalleFacturas
 *     summary: Obtener detalles de una factura
 *     parameters:
 *       - in: path
 *         name: facturaId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de detalles
 */
router.get("/:facturaId/detalles", DetalleFacturasController.getByFactura);

/**
 * @swagger
 * /detalles:
 *   post:
 * tags:
 *       - DetalleFacturas
 *     summary: Crear un detalle de factura
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - factura
 *               - producto
 *               - cantidades
 *               - precios
 *             properties:
 *               factura:
 *                 type: integer
 *               producto:
 *                 type: integer
 *               cantidades:
 *                 type: integer
 *               precios:
 *                 type: number
 *     responses:
 *       201:
 *         description: Detalle creado
 */
router.post("/", DetalleFacturasController.create);

/**
 * @swagger
 * /detalles/{id}:
 *   put:
 *     tags:
 *       - DetalleFacturas
 *     summary: Actualizar un detalle de factura
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cantidades:
 *                 type: integer
 *               precios:
 *                 type: number
 *     responses:
 *       200:
 *         description: Detalle actualizado
 *       404:
 *         description: Detalle no encontrado
 */
router.put("/:id", DetalleFacturasController.update);

/**
 * @swagger
 * /detalles/{id}:
 *   delete:
 *     tags:
 *       - DetalleFacturas
 *     summary: Eliminar un detalle de factura
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalle eliminado
 *       404:
 *         description: Detalle no encontrado
 */
router.delete("/:id", DetalleFacturasController.delete);

module.exports = router;
