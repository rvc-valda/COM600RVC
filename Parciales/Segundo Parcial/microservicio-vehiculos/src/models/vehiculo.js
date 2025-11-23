const mongoose = require('mongoose');

const vehiculoSchema = new mongoose.Schema({
  placa: {
    type: String,
    unique: true
  },
  tipo: {
    type: String
  },
  capacidad: {
    type: Number
  },
  estado: {
    type: String,
    required: true
  }
});

const Vehiculo = mongoose.model('Vehiculo', vehiculoSchema);

module.exports = Vehiculo;