const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Envio {
    id: ID!
    usuario_id: Int!
    vehiculo_id: String!
    origen: String!
    destino: String!
    fecha_envio: String!
    estado: String!
  }

  input CrearEnvioInput {
    usuario_id: Int!
    vehiculo_id: String!
    origen: String!
    destino: String!
    fecha_envio: String!
  }

  type Query {
    envios: [Envio!]!
    envio(id: ID!): Envio
  }

  type Mutation {
    crearEnvio(input: CrearEnvioInput!): Envio!
  }
`;

module.exports = { typeDefs };