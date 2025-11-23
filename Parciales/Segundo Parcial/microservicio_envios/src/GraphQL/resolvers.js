const { AppDataSource } = require('../config/dataSource');
const { vehiculoClient } = require('../grpc/client');

let Envio;

const initializeRepos = async () => {
  if (!Envio) {
    await AppDataSource.initialize();
    Envio = AppDataSource.getRepository('Envio');
  }
};

const resolvers = {
  Query: {
    envios: async () => {
      await initializeRepos();
      return await Envio.find();
    },
    envio: async (_, { id }) => {
      await initializeRepos();
      return await Envio.findOne({ where: { id } });
    },
  },

  Mutation: {
    crearEnvio: async (_, { input }) => {
      await initializeRepos();

      const response = await new Promise((resolve, reject) => {
        vehiculoClient.VerificarDisponibilidad(
          { id: input.vehiculo_id },
          (error, res) => {
            if (error) return reject(error);
            resolve(res);
          }
        );
      });

      if (!response.disponible) {
        throw new Error(`Vehículo ${input.vehiculo_id} no está disponible`);
      }

      const nuevoEnvio = Envio.create({
        ...input,
        estado: 'pendiente',
      });

      return await Envio.save(nuevoEnvio);
    },
  },
};

module.exports = { resolvers };