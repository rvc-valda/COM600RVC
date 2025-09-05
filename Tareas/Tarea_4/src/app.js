require("dotenv").config();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const express = require("express");
const connection = require("./config/database");
const routes = require("./routes");

const PORT = process.env.PORT || 3001;

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API REST FULL de Gestión de Sistema de Ventas",
      version: "1.0.0",
      description: "Documentación de la API REST",
    },
    tags: [
      { name: "Productos", description: "Gestión de productos" },
      { name: "Clientes", description: "Gestión de clientes" },
      { name: "Facturas", description: "Gestión de facturas" },
      {
        name: "DetalleFacturas",
        description: "Gestión de detalles de facturas",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const app = express();
const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use(express.json());
app.use("/", routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

connection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error al conectar con la base de datos:", err);
  });
