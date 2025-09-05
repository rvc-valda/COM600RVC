const resolvers = {
  Query: {
    getLibros: async (_, __, { dataSource }) => {
      try {
        return await dataSource.getRepository("Libro").find({
          relations: ["prestamos"],
        });
      } catch (error) {
        throw new Error(`Error al obtener libros: ${error.message}`);
      }
    },

    getPrestamos: async (_, __, { dataSource }) => {
      try {
        return await dataSource.getRepository("Prestamo").find({
          relations: ["libro"],
        });
      } catch (error) {
        throw new Error(`Error al obtener préstamos: ${error.message}`);
      }
    },

    getPrestamoById: async (_, { id }, { dataSource }) => {
      try {
        const prestamo = await dataSource.getRepository("Prestamo").findOne({
          where: { id: parseInt(id) },
          relations: ["libro"],
        });

        if (!prestamo) {
          throw new Error(`Préstamo con ID ${id} no encontrado`);
        }

        return prestamo;
      } catch (error) {
        throw new Error(`Error al obtener préstamo: ${error.message}`);
      }
    },

    getPrestamosByUsuario: async (_, { usuario }, { dataSource }) => {
      try {
        return await dataSource.getRepository("Prestamo").find({
          where: { usuario: usuario },
          relations: ["libro"],
        });
      } catch (error) {
        throw new Error(
          `Error al obtener préstamos por usuario: ${error.message}`
        );
      }
    },
  },

  Mutation: {
    createLibro: async (
      _,
      { titulo, autor, isbn, anio_publicacion },
      { dataSource }
    ) => {
      try {
        const libroRepo = dataSource.getRepository("Libro");

        const libroExistente = await libroRepo.findOne({ where: { isbn } });
        if (libroExistente) {
          throw new Error(`Ya existe un libro con ISBN ${isbn}`);
        }

        const nuevoLibro = libroRepo.create({
          titulo,
          autor,
          isbn,
          anio_publicacion,
        });

        return await libroRepo.save(nuevoLibro);
      } catch (error) {
        throw new Error(`Error al crear libro: ${error.message}`);
      }
    },

    createPrestamo: async (
      _,
      { usuario, fecha_prestamo, fecha_devolucion, libroId },
      { dataSource }
    ) => {
      try {
        const prestamoRepo = dataSource.getRepository("Prestamo");
        const libroRepo = dataSource.getRepository("Libro");

        const libro = await libroRepo.findOne({
          where: { id: parseInt(libroId) },
        });
        if (!libro) {
          throw new Error(`Libro con ID ${libroId} no encontrado`);
        }

        const fechaPrestamo = new Date(fecha_prestamo);
        const fechaDevolucion = new Date(fecha_devolucion);

        if (fechaDevolucion <= fechaPrestamo) {
          throw new Error(
            "La fecha de devolución debe ser posterior a la fecha de préstamo"
          );
        }

        const nuevoPrestamo = prestamoRepo.create({
          usuario,
          fecha_prestamo: fechaPrestamo,
          fecha_devolucion: fechaDevolucion,
          libro,
        });

        return await prestamoRepo.save(nuevoPrestamo);
      } catch (error) {
        throw new Error(`Error al crear préstamo: ${error.message}`);
      }
    },
  },
};

module.exports = resolvers;
