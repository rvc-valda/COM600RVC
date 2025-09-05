const { EntitySchema } = require("typeorm");

module.exports.DetalleFacturas = new EntitySchema({
  name: "DetalleFacturas",
  tableName: "detalle_facturas",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
      generationStrategy: "increment",
    },
    cantidades: {
      type: Number,
    },
    precios: {
      type: Number,
    },
  },
  relations: {
    factura: {
      type: "many-to-one",
      target: "Facturas",
      joinColumn: {
        name: "factura_id",
      },
      nullable: false,
    },
    producto: {
      type: "many-to-one",
      target: "Productos",
      joinColumn: {
        name: "producto_id",
      },
      nullable: false,
    },
  },
});
