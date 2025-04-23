import mongoose from "mongoose";

const codigoVinculacionSchema = new mongoose.Schema({
  codigo_vinculacion: { type: String, required: true, unique: true },
  fecha_creacion: { type: Date, default: Date.now },
  estado: { type: String, enum: ["pendiente", "vinculado"], default: "pendiente" }, // Pendiente hasta que se vincule
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Usuario que vinculará la pantalla (si se valida)
  pantallaId: { type: mongoose.Schema.Types.ObjectId, ref: "Pantalla" }, // Pantalla vinculada
});

const CodigoVinculacion = mongoose.model("CodigoVinculacion", codigoVinculacionSchema);
export default CodigoVinculacion;
