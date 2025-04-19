import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Conexión exitosa a MongoDB!");
  } catch (err) {
    console.error("❌ Error al conectar con MongoDB", err);
    process.exit(1);
  }
};

// Exportación utilizando ES Modules
export default connectDB;
