require('reflect-metadata');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./GraphQL/schema');
const { resolvers } = require('./GraphQL/resolvers');
const { initDB } = require('./config/database');

const app = express();
const PORT = 5000;

async function startServer() {
  try {
    await initDB(); 

    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({ app });

    app.listen(PORT, () => {
      console.log(`Servidor GraphQL en http://localhost:${PORT}${server.graphqlPath}`);
    });
  } catch (err) {
    console.error('Error al iniciar:', err);
    process.exit(1);
  }
}

startServer();