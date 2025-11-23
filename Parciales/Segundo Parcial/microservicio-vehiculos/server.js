require('dotenv').config();
const express = require('express');
const conectarDB = require('./src/config/database');
const vehiculosRoutes = require('./src/routes/vehiculos');
const setupSwagger = require('./src/swagger/swagger');

const app = express();

app.use(express.json());

// Conectar a MongoDB
conectarDB();

// Configurar Swagger
setupSwagger(app);

// Rutas
app.use('/api/vehiculos', vehiculosRoutes);


// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Documentación: http://localhost:${PORT}/api-docs`);
});