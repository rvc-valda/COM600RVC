const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Libro {
    id: ID!
    titulo: String!
    autor: String!
    isbn: String!
    anio_publicacion: Int!
    prestamos: [Prestamo!]
  }

  type Prestamo {
    id: ID!
    usuario: String!
    fecha_prestamo: String!
    fecha_devolucion: String!
    libro: Libro!
  }

  type Query {
    # Obtener todos los libros
    getLibros: [Libro!]!

    # Obtener todos los préstamos
    getPrestamos: [Prestamo!]!

    # Obtener un préstamo por su ID
    getPrestamoById(id: ID!): Prestamo

    # Desafío extra: filtrar préstamos por usuario
    getPrestamosByUsuario(usuario: String!): [Prestamo!]!
  }

  type Mutation {
    # Crear un libro
    createLibro(
      titulo: String!
      autor: String!
      isbn: String!
      anio_publicacion: Int!
    ): Libro!

    # Registrar un préstamo
    createPrestamo(
      usuario: String!
      fecha_prestamo: String!
      fecha_devolucion: String!
      libroId: ID!
    ): Prestamo!
  }
`;

module.exports = typeDefs;
