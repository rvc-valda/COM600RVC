const { DataSource, EntitySchema } = require('typeorm');

const EnvioSchema = new EntitySchema({
  name: 'Envio',
  tableName: 'envios',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: 'increment',
    },
    usuario_id: { type: 'int' },
    vehiculo_id: { type: 'varchar', length: 50 },
    origen: { type: 'varchar', length: 100 },
    destino: { type: 'varchar', length: 100 },
    fecha_envio: { type: 'date' },
    estado: {
      type: 'varchar',
      length: 20,
      default: 'pendiente', 
      nullable: false,
    },
  },
});

const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  username: 'root',
  password: 'admin',
  database: 'envios_db',
  synchronize: true,
  logging: false,
  entities: [EnvioSchema],
});

module.exports = { AppDataSource };