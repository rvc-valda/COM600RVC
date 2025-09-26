let dataSource;

async function setDataSource(ds) {
    dataSource = ds;
}

// Obtener todos los médicos
const getMedicos = async (req, res) => {
    try {
        const [rows] = await dataSource.query("SELECT * FROM medico");
        console.log(rows);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Crear un nuevo médico
const createMedico = async (req, res) => {
    try {
        const { nombre, apellido, cedula_profesional, especialidad, anios_experiencia, correo_electronico } = req.body;
        await dataSource.query(
            "INSERT INTO medico (nombre, apellido, cedula_profesional, especialidad, anios_experiencia, correo_electronico) VALUES (?, ?, ?, ?, ?, ?)",
            [nombre, apellido, cedula_profesional, especialidad, anios_experiencia, correo_electronico]
        );
        res.json({ message: "Médico creado correctamente" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Actualizar un médico
const updateMedico = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellido, cedula_profesional, especialidad, anios_experiencia, correo_electronico } = req.body;
        await dataSource.query(
            "UPDATE medico SET nombre=?, apellido=?, cedula_profesional=?, especialidad=?, anios_experiencia=?, correo_electronico=? WHERE id=?",
            [nombre, apellido, cedula_profesional, especialidad, anios_experiencia, correo_electronico, id]
        );
        res.json({ message: "Médico actualizado correctamente" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Eliminar un médico
const deleteMedico = async (req, res) => {
    try {
        const { id } = req.params;
        await dataSource.query("DELETE FROM medico WHERE id = ?", [id]);
        res.json({ message: "Médico eliminado correctamente" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { setDataSource, getMedicos, createMedico, updateMedico, deleteMedico };
