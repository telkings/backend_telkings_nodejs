import mongoose from "mongoose"; // Usamos import en lugar de require
import  pantallaSchema  from "./Pantalla.js"; // 👈 importar el modelo de pantalla

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  businessName: String,
  pantallas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pantalla' }], // Relación correcta
});

// Exportamos el modelo usando la sintaxis ES Module
const User = mongoose.model("User", userSchema);
export default User;
