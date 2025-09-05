const express = require("express");
const router = express.Router();

const productosRoutes = require("./productos");
const clientesRoutes = require("./clientes");
const facturasRoutes = require("./facturas");
const detalleFacturasRoutes = require("./detalleFacturas");

router.use("/productos", productosRoutes);
router.use("/clientes", clientesRoutes);
router.use("/facturas", facturasRoutes);
router.use("/detalles", detalleFacturasRoutes);

module.exports = router;
