const mongoose = require('mongoose');

const datoSchema = new mongoose.Schema({
    nombres: { type: String, required: true },
    apellidos: { type: String, required: true },
    fecha_nacimiento: { type: Date, required: true },
    direccion: String,
    celular: String,
    correo: String
});

module.exports = mongoose.model('Dato', datoSchema);
