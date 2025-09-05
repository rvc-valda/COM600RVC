const { createConnection } = require("typeorm");
const { Productos } = require("../entities/Productos");
const { Clientes } = require("../entities/Clientes");
const { Facturas } = require("../entities/Facturas");
const { DetalleFacturas } = require("../entities/DetalleFacturas");

const connection = async () => {
  try {
    await createConnection({
      type: "mysql",
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Productos, Clientes, Facturas, DetalleFacturas],
      synchronize: true,
    });
    console.log("Conexión a la base de datos establecida correctamente.");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    process.exit(1);
  }
};

module.exports = connection;
