const { EntitySchema } = require("typeorm");

module.exports.Clientes = new EntitySchema({
  name: "Clientes",
  tableName: "clientes",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
      generationStrategy: "increment",
    },
    ci: {
      type: String,
      length: 10,
    },
    nombres: {
      type: String,
      length: 100,
    },
    apellidos: {
      type: String,
      length: 100,
    },
    sexo: {
      type: String,
      length: 20,
    },
  },
});
