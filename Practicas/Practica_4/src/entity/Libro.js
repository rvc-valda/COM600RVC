const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Libro",
  tableName: "libro",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    titulo: {
      type: String,
      length: 255,
    },
    autor: {
      type: String,
      length: 255,
    },
    isbn: {
      type: String,
      length: 20,
      unique: true,
    },
    anio_publicacion: {
      type: Number,
    },
  },
  relations: {
    prestamos: {
      type: "one-to-many",
      target: "Prestamo",
      inverseSide: "libro",
    },
  },
});
