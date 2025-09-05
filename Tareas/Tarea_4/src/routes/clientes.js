const express = require("express");
const ClientesController = require("../controllers/ClientesController");
const FacturasController = require("../controllers/FacturasController");
const router = express.Router();

/**
 * @swagger
 * /clientes:
 *   get:
 *     tags:
 *       - Clientes
 *     summary: Obtener todos los clientes
 *     description: Retorna una lista de clientes con paginación y búsqueda opcional.
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
 *         description: Cantidad de clientes por página
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Buscar por nombre, cédula y sexo
 *     responses:
 *       200:
 *         description: Lista de clientes
 */
router.get("/", ClientesController.getAll);

/**
 * @swagger
 * /clientes/{id}:
 *   get:
 *     tags:
 *       - Clientes
 *     summary: Obtener un cliente por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *       404:
 *         description: Cliente no encontrado
 */
router.get("/:id", ClientesController.getById);

/**
 * @swagger
 * /clientes:
 *   post:
 *     tags:
 *       - Clientes
 *     summary: Crear un cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ci
 *               - nombres
 *               - apellidos
 *               - sexo
 *             properties:
 *               ci:
 *                 type: string
 *               nombres:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               sexo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cliente creado
 */
router.post("/", ClientesController.create);

/**
 * @swagger
 * /clientes/{id}:
 *   put:
 *     tags:
 *       - Clientes
 *     summary: Actualizar un cliente
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
 *               ci:
 *                 type: string
 *               nombres:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               sexo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cliente actualizado
 *       404:
 *         description: Cliente no encontrado
 */
router.put("/:id", ClientesController.update);

/**
 * @swagger
 * /clientes/{id}:
 *   delete:
 *     tags:
 *       - Clientes
 *     summary: Eliminar un cliente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cliente eliminado
 *       404:
 *         description: Cliente no encontrado
 */
router.delete("/:id", ClientesController.delete);

/**
 * @swagger
 * /clientes/{clienteId}/facturas:
 *   get:
 *     tags:
 *       - Clientes
 *     summary: Obtener facturas de un cliente
 *     parameters:
 *       - in: path
 *         name: clienteId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de facturas del cliente
 */
router.get("/:clienteId/facturas", FacturasController.getByCliente);

module.exports = router;
