const { getRepository, Like } = require("typeorm");

class FacturasController {
  async getAll(req, res) {
    const repo = getRepository("Facturas");
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    const [result, total] = await repo.findAndCount({
      relations: ["cliente"],
      where: search ? [{ id: Like(`%${search}%`) }] : {},
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
    const repo = getRepository("Facturas");
    const factura = await repo.findOne({
      where: { id: req.params.id },
      relations: ["cliente"],
    });
    if (!factura)
      return res.status(404).json({ message: "Factura no encontrada" });
    res.json(factura);
  }

  async getByCliente(req, res) {
    const repo = getRepository("Facturas");
    const clienteId = req.params.clienteId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    const [result, total] = await repo.findAndCount({
      relations: ["cliente"],
      where: {
        cliente: { id: clienteId },
        ...(search ? { id: Like(`%${search}%`) } : {}),
      },
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

  async create(req, res) {
    const repo = getRepository("Facturas");
    const nueva = repo.create(req.body);
    await repo.save(nueva);
    res.status(201).json(nueva);
  }

  async update(req, res) {
    const repo = getRepository("Facturas");
    const factura = await repo.findOne({ where: { id: req.params.id } });
    if (!factura)
      return res.status(404).json({ message: "Factura no encontrada" });

    repo.merge(factura, req.body);
    await repo.save(factura);
    res.json(factura);
  }

  async delete(req, res) {
    const repo = getRepository("Facturas");
    const factura = await repo.findOne({ where: { id: req.params.id } });
    if (!factura)
      return res.status(404).json({ message: "Factura no encontrada" });

    await repo.remove(factura);
    res.json({ message: "Factura eliminada correctamente" });
  }
}

module.exports = new FacturasController();
