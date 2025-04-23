import express from 'express';
import Pantalla from '../models/Pantalla.js';
import CodigoVinculacion from '../models/CodigoVinculacion.js';
import User from '../models/User.js';
import { v4 as uuidv4 } from 'uuid';
import verificarToken from '../middleware/verificarToken.js';

const router = express.Router();

router.post('/create-screen', verificarToken, async (req, res) => {
  const {
    codigo_vinculacion,
    nombre_pantalla,
    ubicacion,
    orientacion
  } = req.body;


  const usuarioId = req.user.id; 
  console.log("Token decifrado => "+ usuarioId)

  try {
    // Validar que el código exista y esté pendiente
    const codigo = await CodigoVinculacion.findOne({
      codigo_vinculacion,
      estado: 'pendiente'
    });

    if (!codigo) {
      return res.status(400).json({ mensaje: 'Código inválido o ya vinculado' });
    }

    // Crear nueva pantalla
    const nuevaPantalla = new Pantalla({
      id_pantalla: uuidv4(), // Generar ID único
      codigo_vinculacion,
      nombre_pantalla,
      ubicacion,
      orientacion: orientacion.toLowerCase(),
      contenido: [],
      usuarioId: usuarioId
    });

    await nuevaPantalla.save();
    console.log("PANTALLA GUARDADA EXITOSAMENTE!!!!!!!!!")

    // Actualizar código a vinculado
    codigo.estado = 'vinculado';
    codigo.pantallaId = nuevaPantalla._id;
    codigo.usuarioId = usuarioId;
    await codigo.save();

   // 2. Agregar la pantalla al array de pantallas del usuario
   await User.findByIdAndUpdate(usuarioId, {
    $push: { pantallas: nuevaPantalla._id }
  });

    console.log("PANTALLA PUSH AL USUARIO EXISTOSAMENTE!!!!!!!!!")

    res.status(201).json({
      valido: true,
      //pantalla: nuevaPantalla
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error del servidor al crear la pantalla' });
  }
});

export default router;
