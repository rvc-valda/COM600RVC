require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());

// Configuración de la base de datos
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Conectar a la base de datos
db.connect((error) => {
  if (error) {
    console.error('Error al conectar a la base de datos:', error);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Ruta POST para login
app.post('/api/login', (req, res) => {
  const { correo, password } = req.body;
  if (!correo || !password) {
    return res.status(400).json({ 
      mensaje: 'Correo y contraseña son requeridos' 
    });
  }
  const query = 'SELECT * FROM usuarios WHERE correo = ?';
  
  db.query(query, [correo], async (error, resultados) => {
    if (error) {
      console.error('Error en la consulta:', error);
      return res.status(500).json({ 
        mensaje: 'Error en el servidor' 
      });
    }
    if (resultados.length === 0) {
      return res.status(401).json({ 
        mensaje: 'Credenciales incorrectas' 
      });
    }

    const usuario = resultados[0];

    // Generar el JWT
    const token = jwt.sign(
      { 
        id: usuario.id, 
        correo: usuario.correo 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Devuelve el token al cliente
    res.json({
      mensaje: 'Login exitoso',
      token: token,
      usuario: {
        id: usuario.id,
        correo: usuario.correo
      }
    });
  });
});

app.get('/', (req, res) => {
  res.json({ mensaje: 'Servidor funcionando correctamente' });
});

// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});