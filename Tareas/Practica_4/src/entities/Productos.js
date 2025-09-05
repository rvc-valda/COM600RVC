const { EntitySchema } = require("typeorm");

module.exports.Productos = new EntitySchema({
  name: "Productos",
  tableName: "productos",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
      generationStrategy: "increment",
    },
    nombre: {
      type: String,
      length: 100,
    },
    descripcion: {
      type: String,
      length: 500,
      required: false,
    },
    marca: {
      type: String,
      length: 100,
      required: false,
    },
    stock: {
      type: Number,
      default: 0,
    },
  },
});
