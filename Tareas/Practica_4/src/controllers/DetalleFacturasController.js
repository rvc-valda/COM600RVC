const { getRepository } = require("typeorm");

class DetalleFacturasController {
  async getByFactura(req, res) {
    const repo = getRepository("DetalleFacturas");
    const facturaId = req.params.facturaId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const [result, total] = await repo.findAndCount({
      relations: ["producto", "factura"],
      where: { factura: { id: facturaId } },
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
    const repo = getRepository("DetalleFacturas");
    const nuevo = repo.create(req.body);
    await repo.save(nuevo);
    res.status(201).json(nuevo);
  }

  async update(req, res) {
    const repo = getRepository("DetalleFacturas");
    const detalle = await repo.findOne({
      where: { id: req.params.id },
    });

    if (!detalle) {
      return res.status(404).json({ message: "Detalle no encontrado" });
    }

    repo.merge(detalle, req.body);
    await repo.save(detalle);
    res.json(detalle);
  }

  async delete(req, res) {
    const repo = getRepository("DetalleFacturas");
    const detalle = await repo.findOne({
      where: { id: req.params.id },
    });

    if (!detalle) {
      return res.status(404).json({ message: "Detalle no encontrado" });
    }

    await repo.remove(detalle);
    res.json({ message: "Detalle eliminado correctamente" });
  }
}

module.exports = new DetalleFacturasController();
