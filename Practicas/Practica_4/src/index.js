require("reflect-metadata");
const { DataSource } = require("typeorm");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema/typeDefs");
const resolvers = require("./schema/resolvers");
const Libro = require("./entity/Libro");
const Prestamo = require("./entity/Prestamo");

const AppDataSource = new DataSource({
  type: "mysql",
  host: "127.0.0.1",
  port: 3307,
  username: "root",
  password: "admin",
  database: "biblioteca",
  synchronize: true,
  logging: false,
  entities: [Libro, Prestamo],
});

async function startServer() {
  try {
    const app = express();

    await AppDataSource.initialize();
    console.log("Conectado a la base de datos");

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: () => ({
        dataSource: AppDataSource,
      }),
    });

    await server.start();
    server.applyMiddleware({ app });

    const PORT = 4000;
    app.listen(PORT, () => {
      console.log(
        `Servidor GraphQL listo en http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
  }
}

module.exports = { AppDataSource };

startServer();
