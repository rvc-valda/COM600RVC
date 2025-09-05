const { getRepository, Like } = require("typeorm");

class ProductosController {
  async getAll(req, res) {
    const repo = getRepository("Productos");
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    const [result, total] = await repo.findAndCount({
      where: search
        ? [
            { nombre: Like(`%${search}%`) },
            { descripcion: Like(`%${search}%`) },
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
  }

  async getById(req, res) {
    const repo = getRepository("Productos");
    const producto = await repo.findOne({ where: { id: req.params.id } });
    if (!producto)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.json(producto);
  }

  async create(req, res) {
    const repo = getRepository("Productos");
    const nuevo = repo.create(req.body);
    await repo.save(nuevo);
    res.status(201).json(nuevo);
  }

  async update(req, res) {
    const repo = getRepository("Productos");
    const producto = await repo.findOne({ where: { id: req.params.id } });
    if (!producto)
      return res.status(404).json({ message: "Producto no encontrado" });

    repo.merge(producto, req.body);
    await repo.save(producto);
    res.json(producto);
  }

  async delete(req, res) {
    const repo = getRepository("Productos");
    const producto = await repo.findOne({ where: { id: req.params.id } });
    if (!producto)
      return res.status(404).json({ message: "Producto no encontrado" });

    await repo.remove(producto);
    res.json({ message: "Producto eliminado correctamente" });
  }
}

module.exports = new ProductosController();
