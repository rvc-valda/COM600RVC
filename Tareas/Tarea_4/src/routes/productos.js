const express = require("express");
const ProductosController = require("../controllers/ProductosController");
const router = express.Router();

/**
 * @swagger
 * /productos:
 *   get:
 *     tags:
 *       - Productos
 *     summary: Obtener todos los productos
 *     description: Retorna una lista de productos con paginación y búsqueda opcional.
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
 *         description: Cantidad de productos por página
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Buscar por nombre o descripción
 *     responses:
 *       200:
 *         description: Lista de productos obtenida
 */
router.get("/", ProductosController.getAll);

/**
 * @swagger
 * /productos/{id}:
 *   get:
 *     tags:
 *       - Productos
 *     summary: Obtener un producto por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       404:
 *         description: Producto no encontrado
 */
router.get("/:id", ProductosController.getById);

/**
 * @swagger
 * /productos:
 *   post:
 *     tags:
 *       - Productos
 *     summary: Crear un producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - stock
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               marca:
 *                 type: string
 *               stock:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Producto creado
 */
router.post("/", ProductosController.create);

/**
 * @swagger
 * /productos/{id}:
 *   put:
 *     tags:
 *       - Productos
 *     summary: Actualizar un producto
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
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               marca:
 *                 type: string
 *               stock:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Producto actualizado
 *       404:
 *         description: Producto no encontrado
 */
router.put("/:id", ProductosController.update);

/**
 * @swagger
 * /productos/{id}:
 *   delete:
 *     tags:
 *       - Productos
 *     summary: Eliminar un producto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto eliminado
 *       404:
 *         description: Producto no encontrado
 */
router.delete("/:id", ProductosController.delete);

module.exports = router;
