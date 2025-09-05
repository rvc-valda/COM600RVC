const { getRepository, Like } = require("typeorm");

class ClientesController {
  async getAll(req, res) {
    try {
      const repo = getRepository("Clientes");
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const search = req.query.search || "";

      const [result, total] = await repo.findAndCount({
        where: search
          ? [
              { nombres: Like(`%${search}%`) },
              { apellidos: Like(`%${search}%`) },
              { ci: Like(`%${search}%`) },
              { sexo: Like(`%${search}%`) },
            ]
          : {},
        take: limit,
        skip: (page - 1) * limit,
      });

      res.json({
        data: result,
        total,
        page,
        last_page: Math.ceil(total / limit),
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error al obtener clientes", error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const repo = getRepository("Clientes");
      const cliente = await repo.findOne({ where: { id: req.params.id } });
      if (!cliente)
        return res.status(404).json({ message: "Cliente no encontrado" });

      res.json(cliente);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error al obtener el cliente", error: error.message });
    }
  }

  async create(req, res) {
    try {
      const { ci, nombres, apellidos, sexo } = req.body;

      // Validación de campos requeridos
      const errores = [];
      if (!ci) errores.push("ci es requerido");
      if (!nombres) errores.push("nombres es requerido");
      if (!apellidos) errores.push("apellidos es requerido");
      if (!sexo) errores.push("sexo es requerido");

      if (errores.length > 0) {
        return res
          .status(400)
          .json({ message: "Datos incompletos", errors: errores });
      }

      const repo = getRepository("Clientes");
      const nuevo = repo.create(req.body);
      await repo.save(nuevo);
      res.status(201).json(nuevo);
    } catch (error) {
      console.error(error);
      res
        .status(400)
        .json({ message: "Error al crear el cliente", error: error.message });
    }
  }

  async update(req, res) {
    try {
      const repo = getRepository("Clientes");
      const cliente = await repo.findOne({ where: { id: req.params.id } });
      if (!cliente)
        return res.status(404).json({ message: "Cliente no encontrado" });

      // Opcional: validar si se envían campos vacíos al actualizar
      const { ci, nombres, apellidos, sexo } = req.body;
      const errores = [];
      if ("ci" in req.body && !ci) errores.push("ci no puede estar vacío");
      if ("nombres" in req.body && !nombres)
        errores.push("nombres no puede estar vacío");
      if ("apellidos" in req.body && !apellidos)
        errores.push("apellidos no puede estar vacío");
      if ("sexo" in req.body && !sexo)
        errores.push("sexo no puede estar vacío");

      if (errores.length > 0) {
        return res
          .status(400)
          .json({ message: "Datos inválidos", errors: errores });
      }

      repo.merge(cliente, req.body);
      await repo.save(cliente);
      res.json(cliente);
    } catch (error) {
      console.error(error);
      res
        .status(400)
        .json({
          message: "Error al actualizar el cliente",
          error: error.message,
        });
    }
  }

  async delete(req, res) {
    try {
      const repo = getRepository("Clientes");
      const cliente = await repo.findOne({
        where: { id: req.params.id },
        relations: ["facturas"],
      });
      if (!cliente)
        return res.status(404).json({ message: "Cliente no encontrado" });

      // Verificar si tiene facturas asociadas
      if (cliente.facturas && cliente.facturas.length > 0) {
        return res
          .status(400)
          .json({
            message:
              "No se puede eliminar el cliente porque tiene facturas asociadas",
          });
      }

      await repo.remove(cliente);
      res.json({ message: "Cliente eliminado correctamente" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          message: "Error al eliminar el cliente",
          error: error.message,
        });
    }
  }
}

module.exports = new ClientesController();
