// src/middlewares/verificarToken.js
import jwt from 'jsonwebtoken';

const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extrae el token después de "Bearer"

  if (!token) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica el token
    req.user = decoded; // Guarda el usuario decodificado en req.user
    next(); // Continúa con la siguiente función
  } catch (error) {
    return res.status(403).json({ mensaje: 'Token inválido' });
  }
};

export default verificarToken;

