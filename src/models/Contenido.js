import mongoose from "mongoose";

// Subesquema para los recursos
const recursoSchema = new mongoose.Schema({
  tipo: { type: String, enum: ["imagen", "video", "playlist"], required: true },
  url: { type: String, required: true },
  duracion: { type: Number, required: true } // en segundos
});

// Subesquema para el contenido
const contenidoSchema = new mongoose.Schema({
  nombre: { type: String },
  recursos: [recursoSchema], // 👈 array de imágenes/videos
  loop: { type: Boolean, default: true },
  ordenAleatorio: { type: Boolean, default: false }
});

export default contenidoSchema;

