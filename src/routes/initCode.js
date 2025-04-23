// routes/codigos.js
import express from 'express'
import CodigoVinculacion from '../models/CodigoVinculacion.js'

const router = express.Router()

// Crear un nuevo código de vinculación (lo usará el TV Box)
router.post('/init-code', async (req, res) => {
  const { codigo_vinculacion } = req.body

  try {
    // Verifica que no exista un código duplicado
    const existente = await CodigoVinculacion.findOne({ codigo_vinculacion })
    if (existente) {
      return res.status(400).json({ mensaje: 'El código ya existe' })
    }

    // Crea el nuevo código
    const nuevoCodigo = new CodigoVinculacion({ codigo_vinculacion })
    await nuevoCodigo.save()

    res.status(201).json({
      mensaje: 'Código de vinculación creado correctamente',
      codigo: nuevoCodigo.codigo,
    })
  } catch (error) {
    console.error('Error al crear el código:', error)
    res.status(500).json({ mensaje: 'Error al crear el código' })
  }
})

export default router
