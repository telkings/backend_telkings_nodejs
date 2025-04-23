import express from 'express';
const router = express.Router();
import CodigoVinculacion from '../models/CodigoVinculacion.js';  //Importamos la Colleccion de mongo


router.post('/validate-code', async (req, res) => {

  console.log("✅ LLEGA A LA RUTA DE VALIDACIÓN");
  console.log("📦 BODY:", req.body);

  const { codigo } = req.body; // Se espera que 'codigo' venga en el body

  console.log("Mi Codigo es "+ codigo)

  // Validación simple para asegurarse de que el campo esté presente
  if (!codigo) {
    return res.status(400).json({ valido: false, mensaje: 'Código de vinculación es requerido' });
  }

  try {
    // Buscamos el código en la base de datos, verificando que su estado sea 'pendiente'
    const encontrado = await CodigoVinculacion.findOne({
      codigo_vinculacion: codigo,
      estado: 'pendiente'
    });

    // Si no se encuentra el código o ya ha sido vinculado
    if (!encontrado) {
      return res.json({ valido: false, mensaje: 'Código no encontrado o ya fue vinculado' });
    }

    // Si todo está bien, devolvemos la respuesta positiva
    return res.json({ valido: true, mensaje: 'Código válido para vinculación' });

  } catch (error) {
    console.error(error);
    // En caso de error del servidor
    res.status(500).json({ valido: false, mensaje: 'Error del servidor' });
  }



});



export default router;

