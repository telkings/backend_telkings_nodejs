import mongoose from "mongoose";
import contenidoSchema from "./Contenido.js"; // importamos el esquema de contenido

const pantallaSchema = new mongoose.Schema({
  id_pantalla: { type: String, required: true },
  codigo_vinculacion: { type: String, required: true },
  nombre_pantalla: { type: String, required: true },
  ubicacion: { type: String },
  orientacion: { type: String, enum: ["vertical", "horizontal"], required: true },
  contenido: [contenidoSchema], // Aquí se utiliza el esquema de contenido
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Pantalla = mongoose.model('Pantalla', pantallaSchema);

export default Pantalla;



