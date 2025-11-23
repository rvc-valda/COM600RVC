const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.join(__dirname, 'vehiculos.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const VehiculoService = grpc.loadPackageDefinition(packageDefinition).vehiculos;

const client = new VehiculoService.VehiculoService(
  'localhost:4000',
  grpc.credentials.createInsecure()
);

module.exports = { vehiculoClient: client };