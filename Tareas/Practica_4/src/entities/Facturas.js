const { EntitySchema } = require("typeorm");

module.exports.Facturas = new EntitySchema({
  name: "Facturas",
  tableName: "facturas",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
      generationStrategy: "increment",
    },
    fecha: {
      type: Date,
    },
  },
  relations: {
    cliente: {
      type: "many-to-one",
      target: "Clientes",
      joinColumn: {
        name: "cliente_id",
      },
      nullable: false,
    },
  },
});
