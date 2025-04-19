import mongoose from "mongoose"; // Usamos import en lugar de require

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  businessName: String
});

// Exportamos el modelo usando la sintaxis ES Module
const User = mongoose.model("User", userSchema);
export default User;
