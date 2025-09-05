const express = require("express");
const FacturasController = require("../controllers/FacturasController");
const router = express.Router();

/**
 * @swagger
 * /facturas:
 *   get:
 *     tags:
 *       - Facturas
 *     summary: Obtener todas las facturas
 *     description: Retorna una lista de facturas con paginación y búsqueda opcional.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Cantidad de facturas por página
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Buscar por cliente o fecha
 *     responses:
 *       200:
 *         description: Lista de facturas
 */
router.get("/", FacturasController.getAll);

/**
 * @swagger
 * /facturas/{id}:
 *   get:
 *     tags:
 *       - Facturas
 *     summary: Obtener una factura por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Factura encontrada
 *       404:
 *         description: Factura no encontrada
 */
router.get("/:id", FacturasController.getById);

/**
 * @swagger
 * /facturas:
 *   post:
 *     tags:
 *       - Facturas
 *     summary: Crear una factura
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fecha
 *               - cliente
 *             properties:
 *               fecha:
 *                 type: string
 *                 format: date
 *               cliente:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Factura creada
 */
router.post("/", FacturasController.create);

/**
 * @swagger
 * /facturas/{id}:
 *   put:
 *     tags:
 *       - Facturas
 *     summary: Actualizar una factura
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
 *               fecha:
 *                 type: string
 *                 format: date
 *               cliente:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Factura actualizada
 *       404:
 *         description: Factura no encontrada
 */
router.put("/:id", FacturasController.update);

/**
 * @swagger
 * /facturas/{id}:
 *   delete:
 *     tags:
 *       - Facturas
 *     summary: Eliminar una factura
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Factura eliminada
 *       404:
 *         description: Factura no encontrada
 */
router.delete("/:id", FacturasController.delete);

module.exports = router;
