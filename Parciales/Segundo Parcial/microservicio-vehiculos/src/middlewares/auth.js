const jwt = require('jsonwebtoken');

// Middleware para verificar el JWT
const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ 
      mensaje: 'Acceso denegado. Token no proporcionado.' 
    });
  }

  try {
    const usuario = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = usuario;
    next();
  } catch (error) {
    return res.status(403).json({ 
      mensaje: 'Token inválido o expirado.' 
    });
  }
};

module.exports = verificarToken;